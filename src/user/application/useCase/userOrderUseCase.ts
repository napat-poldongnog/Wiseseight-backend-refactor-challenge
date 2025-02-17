// * Use case config interface
import type { UseCase } from '../configuration/useCase'

// * Adapter inbound port interface
import type { UserOrderPort } from '../ports/inbound/http/rest/userOrderPort'

// * Domain entity interface
import type { OrderDomainEntity } from '../domain/entities/order/orderDomainEntity'

// * Adapter outbound APIs
import { OrderApiImpl } from '../../adapters/outbound/gatewayAPI/orderApi/orderApiImpl'
import { ProductApiImpl } from '../../adapters/outbound/gatewayAPI/productApi/productApiImpl'

// * Adapter outbound repository
import { UserRepositoryMongoDBImpl } from '../../adapters/outbound/db/mongoDB/userRepositoryMongoDBImpl'

export class UserOrderUseCase implements UseCase<UserOrderPort.Params, UserOrderPort.Result> {
  constructor(
    private readonly userRespositoryMongoDBImpl: UserRepositoryMongoDBImpl,
    private readonly orderApiImpl: OrderApiImpl,
    private readonly productApiImpl: ProductApiImpl,
  ) {}

  async execute(params: UserOrderPort.Params) {
    try {
      const { id } = params

      const user = this.userRespositoryMongoDBImpl.findById(id)

      if (!user) {
        return {
          code: '0001',
          data: [],
          message: 'User not found',
        }
      }

      const userOrders = await this.orderApiImpl.findAllByUserId(id)

      const detailedOrders = userOrders.map(async (order: OrderDomainEntity) => {
        const product = await this.productApiImpl.findById(order.productId)
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
    } catch (e: unknown) {
      let message = 'An error occurred'

      if (typeof e === 'string') {
        message = e
      } else if (e instanceof Error) {
        message = e.message
      }

      return {
        data: [],
        code: 'E500', // Just mock
        message,
      }
    }
  }

  validate() {}
}
