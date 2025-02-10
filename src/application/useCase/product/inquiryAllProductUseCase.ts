// * Use case config interface
import type { UseCase } from '../../configuration/useCase'

// * Inbound port interface
import type { InquiryAllProductPort } from '../../ports/inbound/http/rest/product/inquiryAllProductPort'

// * Outbound repository
import type { ProductRepositoryMongoDBImpl } from '../../../adapters/outbound/db/mongoDB/product/productRepositoryMongoDBImpl'

export class InquiryAllProductUseCase implements UseCase<InquiryAllProductPort.Param, InquiryAllProductPort.Result> {
  constructor(private readonly productRepositoryImpl: ProductRepositoryMongoDBImpl) {}

  async execute(): Promise<InquiryAllProductPort.Result> {
    const products = this.productRepositoryImpl.findAll()

    return {
      code: '0000',
      data: products,
      message: 'Inquiried all products successful',
    }
  }
}
