// * Model interface
import type { ProductMongoDBModel } from './productMongoDBModel'

export class ProductMongoDBRepository {
  private products: ProductMongoDBModel[] = [
    {
      id: '1',
      name: 'Product 1',
      price: 100,
      stock: 3,
    },
    {
      id: '2',
      name: 'Product 2',
      price: 200,
      stock: 5,
    },
  ] // pretend this is a mongoDB collection

  findAll() {
    return this.products
  }

  findOneById(id: string) {
    // let's pretend this is a mongoDB findOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    return this.products.find((p) => p.id === id) ?? null
  }

  createOne(product: ProductMongoDBModel) {
    // let's pretend this is a mongoDB createOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    this.products.push(product)

    return product
  }

  updateOne(product: ProductMongoDBModel) {
    // let's pretend this is a mongoDB updateOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    const index = this.products.findIndex((p) => p.id === product.id)
    if (index !== -1) {
      this.products[index] = product
    }
  }
}
