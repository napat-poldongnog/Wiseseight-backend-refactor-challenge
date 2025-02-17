// * Use case config interface
import type { UseCase } from '../configuration/useCase'

// * Adapter inbound port
import type { InquiryOrderByIdPort } from '../ports/inbound/http/rest/order/inquiryOrderByIdPort'

// * Adapter outbound repository port
import type { OrderRepositoryPort } from '../ports/outbound/repositories/orderRepositoryPort'

// * Adapter outbound gateway api port
import type { ProductApiPort } from '../ports/outbound/gatewayAPI/product/productApiPort'

export class InquiryOrderByIdUserCase implements UseCase<InquiryOrderByIdPort.Params, InquiryOrderByIdPort.Result> {
  constructor(
    private readonly productApiImpl: ProductApiPort,
    private readonly orderRepositoryImpl: OrderRepositoryPort,
  ) {}

  async execute(reqParams: InquiryOrderByIdPort.Params): Promise<InquiryOrderByIdPort.Result> {
    try {
      const { id } = reqParams

      const order = await this.orderRepositoryImpl.findById(id)

      if (!order) {
        return {
          data: null,
          code: '0001', // Just mock
          message: 'Order not found',
        }
      }

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
