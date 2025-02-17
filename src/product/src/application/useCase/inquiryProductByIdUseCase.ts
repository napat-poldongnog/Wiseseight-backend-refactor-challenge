// * Use case config
import type { UseCase } from '../configuration/useCase'

// * Adapter inbound port
import type { InquiryProductByIdPort } from '../ports/inbound/http/rest/product/inquiryProductByIdPort'

// * Adapter outbound repository port
import type { ProductRepositoryPort } from '../ports/outbound/repositories/productRepositoryPort'

export class InquiryProductByIdUseCase implements UseCase<InquiryProductByIdPort.Param, InquiryProductByIdPort.Result> {
  constructor(private readonly productRepositoryImpl: ProductRepositoryPort) {}

  async execute(productId: string): Promise<InquiryProductByIdPort.Result> {
    try {
      const product = await this.productRepositoryImpl.findById(productId)

      return {
        code: '0000',
        data: product,
        message: 'Inquiried product successful',
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
