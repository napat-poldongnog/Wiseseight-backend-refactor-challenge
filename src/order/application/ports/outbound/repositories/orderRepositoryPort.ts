// *  Order domain entity
import type { OrderDomainEntity } from '../../../domain/entities/order/orderDomainEntity'

export interface OrderRepositoryPort {
  findAll: () => Promise<OrderDomainEntity[]>

  findById: (orderId: string) => Promise<OrderDomainEntity | null>

  findAllByUserId: (userId: string) => Promise<unknown[]>

  create: (order: OrderDomainEntity) => Promise<OrderDomainEntity>

  update: (order: OrderDomainEntity) => Promise<void>
}
