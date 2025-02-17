// * Use case config
import type { UseCase } from '../configuration/useCase'

// * Adapter inbound port
import type { UpdateProductPort } from '../ports/inbound/http/rest/product/updateProductPort'

// * Adapter outbound repository
import type { ProductRepositoryPort } from '../ports/outbound/repositories/productRepositoryPort'

export class UpdateProductUseCase implements UseCase<UpdateProductPort.Body, UpdateProductPort.Result> {
  constructor(private readonly productRepositoryImpl: ProductRepositoryPort) {}

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
