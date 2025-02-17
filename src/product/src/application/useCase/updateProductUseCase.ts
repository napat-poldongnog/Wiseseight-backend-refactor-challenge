// * Use case config interface
import type { UseCase } from '../configuration/useCase'

// * Inbound port interface
import type { UpdateProductPort } from '../ports/inbound/http/rest/product/updateProductPort'

// * Outbound repository
import type { ProductRepositoryMongoDBImpl } from '../../adapters/outbound/db/mongoDB/productRepositoryMongoDBImpl'

export class UpdateProductUseCase implements UseCase<UpdateProductPort.Body, UpdateProductPort.Result> {
  constructor(private readonly productRepositoryImpl: ProductRepositoryMongoDBImpl) {}

  async execute(productDetails: UpdateProductPort.Body): Promise<UpdateProductPort.Result> {
    try {
      const product = await this.productRepositoryImpl.update(productDetails)

      return {
        code: '0000',
        data: product,
        message: 'Updated product successful',
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
