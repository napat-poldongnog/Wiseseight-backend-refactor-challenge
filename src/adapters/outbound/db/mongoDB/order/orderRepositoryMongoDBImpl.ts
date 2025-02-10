// * Outbound port interface
import type { OrderRepositoryPort } from '../../../../../application/ports/outbound/repositories/order/orderRepositoryPort'

// * Model interface
import type { OrderMongoDBModel } from './orderMongoDBModel'

// * Order mongoDB repository
import type { OrderMongoDBRepository } from './orderMongoDBRepository'

export class OrderRepositoryMongoDBImpl implements OrderRepositoryPort {
  constructor(private readonly orderMongoDBRepository: OrderMongoDBRepository) {}

  findAll() {
    return this.orderMongoDBRepository.findAll()
  }

  findById(orderId: string) {
    // let's pretend this is a mongoDB findOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    return this.orderMongoDBRepository.findOneById(orderId)
  }

  findAllByUserId(userId: string): any[] {
    return this.orderMongoDBRepository.findAllByUserId(userId)
  }

  create(product: OrderMongoDBModel) {
    // let's pretend this is a mongoDB createOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    return this.orderMongoDBRepository.createOne(product)
  }

  update(product: OrderMongoDBModel) {
    // let's pretend this is a mongoDB updateOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    this.orderMongoDBRepository.updateOne(product)
  }
}
