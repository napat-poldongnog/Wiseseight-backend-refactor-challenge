// * Outbound port interface
import type { ProductRepositoryPort } from '../../../../../application/ports/outbound/repositories/product/productRepositoryPort'

// * Model interface
import type { ProductMongoDBModel } from './productMongoDBModel'

// * Product mongoDB repository
import type { ProductMongoDBRepository } from './productMongoDBRepository'

export class ProductRepositoryMongoDBImpl implements ProductRepositoryPort {
  constructor(private readonly productMongoDBRepository: ProductMongoDBRepository) {}

  findAll() {
    return this.productMongoDBRepository.findAll()
  }

  findById(productId: string) {
    // let's pretend this is a mongoDB findOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    return this.productMongoDBRepository.findOneById(productId)
  }

  create(product: ProductMongoDBModel) {
    // let's pretend this is a mongoDB createOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    return this.productMongoDBRepository.createOne(product)
  }

  update(product: ProductMongoDBModel) {
    // let's pretend this is a mongoDB updateOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    this.productMongoDBRepository.updateOne(product)
  }
}
