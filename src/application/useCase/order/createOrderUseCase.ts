// * UUID
import { v4 as uuidv4 } from 'uuid'

// * Use case config interface
import type { UseCase } from '../../configuration/useCase'

// * Inbound port interface
import type { CreateOrderPort } from '../../ports/inbound/http/rest/order/createOrderPort'

// * Outbound repositories
import type { OrderRepositoryMongoDBImpl } from '../../../adapters/outbound/db/mongoDB/order/orderRepositoryMongoDBImpl'
import type { ProductRepositoryMongoDBImpl } from '../../../adapters/outbound/db/mongoDB/product/productRepositoryMongoDBImpl'

export class CreateOrderUseCase implements UseCase<CreateOrderPort.Body, CreateOrderPort.Result> {
  constructor(
    private readonly productRepositoryImpl: ProductRepositoryMongoDBImpl,
    private readonly orderRepositoryImpl: OrderRepositoryMongoDBImpl,
  ) {}

  async execute(reqBody: CreateOrderPort.Body): Promise<CreateOrderPort.Result> {
    const { userId, productId, quantity } = reqBody

    if (!userId || !productId || !quantity || quantity <= 0) {
      return {
        data: null,
        code: '0001', // Just mock
        message: 'Invalid order details',
      }
    }

    const product = this.productRepositoryImpl.findById(productId)
    if (!product) {
      return {
        data: null,
        code: '0002', // Just mock
        message: 'Product not found',
      }
    }

    if (product.stock < quantity) {
      return {
        data: null,
        code: '0003', // Just mock
        message: 'Insufficient stock',
      }
    }

    const totalPrice = product.price * quantity
    const newOrder = { id: uuidv4(), userId, productId, quantity, totalPrice }

    this.orderRepositoryImpl.create(newOrder)
    product.stock -= quantity
    this.productRepositoryImpl.update(product)

    return {
      data: newOrder,
      code: '0000', // Just mock
      message: 'Order placed successfully',
    }
  }
}
