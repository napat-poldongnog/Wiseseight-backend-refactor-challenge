// * Model interface
import type { OrderMongoDBModel } from './orderMongoDBModel'

export class OrderMongoDBRepository {
  private orders: OrderMongoDBModel[] = [
    {
      id: '1',
      userId: '1',
      productId: '1',
      quantity: 1,
      totalPrice: 100,
    },
    {
      id: '2',
      userId: '1',
      productId: '2',
      quantity: 2,
      totalPrice: 400,
    },
    {
      id: '3',
      userId: '2',
      productId: '1',
      quantity: 1,
      totalPrice: 100,
    },
  ] // pretend this is a mongoDB collection

  findAll = () => {
    return this.orders
  }

  findOneById = (id: string) => {
    // let's pretend this is a mongoDB findOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    return this.orders.find((p) => p.id === id) ?? null
  }

  findAllByUserId = (userId: string) => {
    return this.orders.filter((o) => o.userId === userId)
  }

  createOne = (order: OrderMongoDBModel) => {
    // let's pretend this is a mongoDB createOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    this.orders.push(order)

    return order
  }

  updateOne(order: OrderMongoDBModel) {
    // let's pretend this is a mongoDB updateOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    const index = this.orders.findIndex((p) => p.id === order.id)
    if (index !== -1) {
      this.orders[index] = order
    }
  }
}
