// * Request & Response DTOs
import type { UserOrderRequestDTO } from './dtos/request/userOrderRequestDTO'
import type { UserOrderResponseDTO } from './dtos/response/userOrderResponseDTO'

export interface UserOrderPort {
  execute: (data: UserOrderPort.Params) => Promise<UserOrderPort.Result>
}

export namespace UserOrderPort {
  export type Params = UserOrderRequestDTO

  export interface Result {
    data: UserOrderResponseDTO[]
    code?: string
    message?: string
  }
}
