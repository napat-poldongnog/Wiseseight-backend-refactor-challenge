// * Use case config
import type { UseCase } from '../configuration/useCase'

// * Adapter inbound port
import type { InquiryAllProductPort } from '../ports/inbound/http/rest/product/inquiryAllProductPort'

// * Adapter outbound repository port
import type { ProductRepositoryPort } from '../ports/outbound/repositories/productRepositoryPort'

export class InquiryAllProductUseCase implements UseCase<InquiryAllProductPort.Param, InquiryAllProductPort.Result> {
  constructor(private readonly productRepositoryImpl: ProductRepositoryPort) {}

  async execute(): Promise<InquiryAllProductPort.Result> {
    try {
      const products = await this.productRepositoryImpl.findAll()

      return {
        code: '0000',
        data: products,
        message: 'Inquiried all products successful',
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
}
