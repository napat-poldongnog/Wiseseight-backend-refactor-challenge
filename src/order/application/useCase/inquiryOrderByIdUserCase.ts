// * Use case config interface
import type { UseCase } from '../configuration/useCase'

// * Adapter inbound port interface
import type { InquiryOrderByIdPort } from '../ports/inbound/http/rest/order/inquiryOrderByIdPort'

// * Adapter outbound API
import type { ProductApiImpl } from '../../adapters/outbound/gatewayAPI/productApi/productApiImpl'

// * Adapter outbound repository
import type { OrderRepositoryMongoDBImpl } from '../../adapters/outbound/db/mongoDB/orderRepositoryMongoDBImpl'

export class InquiryOrderByIdUserCase implements UseCase<InquiryOrderByIdPort.Params, InquiryOrderByIdPort.Result> {
  constructor(
    private readonly productApiImpl: ProductApiImpl,
    private readonly orderRepositoryImpl: OrderRepositoryMongoDBImpl,
  ) {}

  async execute(reqParams: InquiryOrderByIdPort.Params): Promise<InquiryOrderByIdPort.Result> {
    try {
      const { id } = reqParams

      const order = await this.orderRepositoryImpl.findById(id)

      let product = null
      if (order?.productId) {
        product = await this.productApiImpl.findById(order.productId)
      }

      return {
        data: order
          ? {
              ...order,
              product: product
                ? {
                    id: product?.id,
                    name: product?.name,
                    price: product?.price,
                    stock: product?.stock,
                  }
                : null,
            }
          : null,
        code: '0000', // Just mock
        message: 'Inquiried order successfully',
      }
    } catch (e: unknown) {
      let message = 'An error occurred'

      if (typeof e === 'string') {
        message = e
      } else if (e instanceof Error) {
        message = e.message
      }

      return {
        data: null,
        code: 'E500', // Just mock
        message,
      }
    }
  }
}
