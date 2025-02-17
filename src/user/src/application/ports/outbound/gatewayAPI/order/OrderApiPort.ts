// * Order domain entity
import type { OrderDomainEntity } from '../../../../domain/entities/order/orderDomainEntity'

export interface OrderApiPort {
  findAllByUserId: (userId: string) => Promise<OrderDomainEntity[]>

  update: (order: OrderDomainEntity) => Promise<void>
}
