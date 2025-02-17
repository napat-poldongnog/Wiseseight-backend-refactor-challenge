// * App env vars
import appEnv from '../../../../application/configuration/properties/appEnv'

// * Outbound port interface
import type { ProductApiPort } from '../../../../application/ports/outbound/gatewayAPI/product/productApiPort'

// * Domain entity interface
import type { ProductDomainEntity } from '../../../../application/domain/entities/product/productDomainEntity'

const env = appEnv()

export class ProductApiImpl implements ProductApiPort {
  private baseApiEndpoint: string = `${env.productServiceEndpoint}/${env.productServiceVersion}/products`

  async findById(productId: string): Promise<ProductDomainEntity> {
    // let's pretend this is a mongoDB findOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    const response = await fetch(`${this.baseApiEndpoint}/${productId}`)
    return await response.json()
  }

  async update(product: ProductDomainEntity) {
    // let's pretend this is a mongoDB updateOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    const response = await fetch(this.baseApiEndpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })

    return await response.json()
  }
}
