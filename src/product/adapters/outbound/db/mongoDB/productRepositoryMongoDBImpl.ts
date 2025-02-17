// * Adapter outbound port interface
import type { ProductRepositoryPort } from '../../../../application/ports/outbound/repositories/productRepositoryPort'

// * Domain entity interface
import type { ProductDomainEntity } from '../../../../application/domain/entities/productDomainEntity'

// * Repository model interface
import type { ProductMongoDBModel } from './productMongoDBModel'

// * Product mongoDB repository
import type { ProductMongoDBRepository } from './productMongoDBRepository'

export class ProductRepositoryMongoDBImpl implements ProductRepositoryPort {
  constructor(private readonly productMongoDBRepository: ProductMongoDBRepository) {}

  async findAll() {
    return this.productMongoDBRepository.findAll()
  }

  async findById(productId: string) {
    // let's pretend this is a mongoDB findOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    return this.productMongoDBRepository.findOneById(productId)
  }

  async create(product: ProductMongoDBModel) {
    // let's pretend this is a mongoDB createOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    return this.productMongoDBRepository.createOne(product)
  }

  async update(product: ProductDomainEntity) {
    // let's pretend this is a mongoDB updateOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    return this.productMongoDBRepository.updateOne(product)
  }
}
