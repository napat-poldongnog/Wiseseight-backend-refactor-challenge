// *  Order domain entity
import type { OrderDomainEntity } from '../../../../domain/entities/order/orderDomainEntity'

export interface OrderRepositoryPort {
  findAll: () => OrderDomainEntity[]

  findById: (orderId: string) => OrderDomainEntity | null

  findAllByUserId: (userId: string) => any[]

  create: (order: OrderDomainEntity) => OrderDomainEntity

  update: (order: OrderDomainEntity) => void
}
