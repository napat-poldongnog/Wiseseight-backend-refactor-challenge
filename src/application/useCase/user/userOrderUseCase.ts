// * Use case config interface
import type { UseCase } from '../../configuration/useCase'

// * Inbound port interface
import type { UserOrderPort } from '../../ports/inbound/http/rest/user/userOrderPort'

// * Outbound repositories
import type { UserRepositoryMongoDBImpl } from '../../../adapters/outbound/db/mongoDB/user/userRepositoryMongoDBImpl'
import type { OrderRepositoryMongoDBImpl } from '../../../adapters/outbound/db/mongoDB/order/orderRepositoryMongoDBImpl'
import type { ProductRepositoryMongoDBImpl } from '../../../adapters/outbound/db/mongoDB/product/productRepositoryMongoDBImpl'

export class UserOrderUseCase implements UseCase<UserOrderPort.Params, UserOrderPort.Result> {
  constructor(
    private readonly userRespositoryMongoDBImpl: UserRepositoryMongoDBImpl,
    private readonly orderRepositoryMongoDBImpl: OrderRepositoryMongoDBImpl,
    private readonly productRepositoryMongoDBImpl: ProductRepositoryMongoDBImpl,
  ) {}

  async execute(params: UserOrderPort.Params) {
    const { id } = params

    const user = this.userRespositoryMongoDBImpl.findById(id)

    if (!user) {
      return {
        code: '0001',
        data: [],
        message: 'User not found',
      }
    }

    const userOrders = this.orderRepositoryMongoDBImpl.findAllByUserId(id)

    const detailedOrders = userOrders.map((order) => {
      const product = this.productRepositoryMongoDBImpl.findById(order.productId)
      return {
        ...order,
        productName: product ? product.name : 'Unknown',
        productPrice: product ? product.price : 0,
      }
    })

    return {
      code: '0000',
      data: detailedOrders,
      message: 'Inquired user orders successful',
    }
  }

  validate() {}
}
