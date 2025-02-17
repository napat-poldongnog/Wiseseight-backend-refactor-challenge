// * Use case config interface
import type { UseCase } from '../configuration/useCase'

// * Adapter inbound port interface
import type { UserOrderPort } from '../ports/inbound/http/rest/userOrderPort'

// * Domain entity interface
import type { OrderDomainEntity } from '../domain/entities/order/orderDomainEntity'

// * Adapter outbound gateway api ports
import type { OrderApiPort } from '../ports/outbound/gatewayAPI/order/OrderApiPort'
import type { ProductApiPort } from '../ports/outbound/gatewayAPI/product/productApiPort'

// * Adapter outbound repository port
import type { UserRepositoryPort } from '../ports/outbound/repositories/userRepositoryPort'

export class UserOrderUseCase implements UseCase<UserOrderPort.Params, UserOrderPort.Result> {
  constructor(
    private readonly userRespositoryMongoDBImpl: UserRepositoryPort,
    private readonly orderApiImpl: OrderApiPort,
    private readonly productApiImpl: ProductApiPort,
  ) {}

  async execute(params: UserOrderPort.Params) {
    try {
      const { id } = params

      const user = await this.userRespositoryMongoDBImpl.findById(id)

      if (!user) {
        return {
          code: '0001',
          data: [],
          message: 'User not found',
        }
      }

      const userOrders = await this.orderApiImpl.findAllByUserId(id)

      const detailedOrders = await Promise.all(
        userOrders.map(async (order: OrderDomainEntity) => {
          const product = await this.productApiImpl.findById(order.productId)

          return {
            ...order,
            productName: product ? product.name : 'Unknown',
            productPrice: product ? product.price : 0,
          }
        }),
      )

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
