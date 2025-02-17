// * Product domain entity
import type { ProductDomainEntity } from '../../../domain/entities/productDomainEntity'

export interface ProductRepositoryPort {
  findAll: () => Promise<ProductDomainEntity[]>

  findById: (productId: string) => Promise<ProductDomainEntity | null>

  create: (product: ProductDomainEntity) => Promise<ProductDomainEntity>

  update: (product: ProductDomainEntity) => Promise<ProductDomainEntity>
}
