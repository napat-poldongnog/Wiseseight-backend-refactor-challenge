// * Use case config interface
import type { UseCase } from '../../configuration/useCase'

// * Inbound port interface
import type { InquiryAllProductPort } from '../../ports/inbound/http/rest/product/inquiryAllProductPort'

// * Outbound repository
import type { ProductRepositoryMongoDBImpl } from '../../../adapters/outbound/db/mongoDB/product/productRepositoryMongoDBImpl'

export class InquiryAllProductUseCase implements UseCase<InquiryAllProductPort.Param, InquiryAllProductPort.Result> {
  constructor(private readonly productRepositoryImpl: ProductRepositoryMongoDBImpl) {}

  async execute(): Promise<InquiryAllProductPort.Result> {
    try {
      const products = this.productRepositoryImpl.findAll()

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
