// * App env vars
import appEnv from '../../../../application/configuration/properties/appEnv'

// * Outbound port interface
import type { OrderApiPort } from '../../../../application/ports/outbound/gatewayAPI/order/OrderApiPort'

// * Domain entity interface
import type { OrderDomainEntity } from '../../../../application/domain/entities/order/orderDomainEntity'

const env = appEnv()

export class OrderApiImpl implements OrderApiPort {
  private baseApiEndpoint: string = `${env.orderServiceEndpoint}/${env.orderServiceVersion}/orders`

  async findAllByUserId(userId: string) {
    // let's pretend this is a mongoDB findOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    const response = await fetch(`${this.baseApiEndpoint}/users/${userId}`)
    return await response.json()
  }

  async update(product: OrderDomainEntity) {
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
