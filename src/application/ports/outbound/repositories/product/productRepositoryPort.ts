// * Product domain entity
import type { ProductDomainEntity } from '../../../../domain/entities/product/productDomainEntity'

export interface ProductRepositoryPort {
  findAll: () => ProductDomainEntity[]

  findById: (productId: string) => ProductDomainEntity | null

  create: (product: ProductDomainEntity) => ProductDomainEntity

  update: (product: ProductDomainEntity) => void
}
