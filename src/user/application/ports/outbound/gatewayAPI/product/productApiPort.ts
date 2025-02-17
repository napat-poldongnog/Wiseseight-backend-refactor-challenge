// * Product domain entity
import type { ProductDomainEntity } from '../../../../domain/entities/product/productDomainEntity'

export interface ProductApiPort {
   findById: (productId: string) => Promise<ProductDomainEntity | null>
}
