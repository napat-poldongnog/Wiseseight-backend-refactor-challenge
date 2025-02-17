// * Use case config interface
import type { UseCase } from '../configuration/useCase'

// * Inbound port interface
import type { InquiryProductByIdPort } from '../ports/inbound/http/rest/product/inquiryProductByIdPort'

// * Outbound repository
import type { ProductRepositoryMongoDBImpl } from '../../adapters/outbound/db/mongoDB/productRepositoryMongoDBImpl'

export class InquiryProductByIdUseCase implements UseCase<InquiryProductByIdPort.Param, InquiryProductByIdPort.Result> {
  constructor(private readonly productRepositoryImpl: ProductRepositoryMongoDBImpl) {}

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
