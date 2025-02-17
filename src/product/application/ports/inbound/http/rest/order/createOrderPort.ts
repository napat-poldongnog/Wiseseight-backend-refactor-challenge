// * Request & Response DTOs
import type { CreateOrderRequestDTO } from './dtos/createOrderRequestDTO'
import type { CreateOrderResponseDTO } from './dtos/createOrderResponseDTO'

export interface CreateOrderPort {
  execute: (data: CreateOrderPort.Body) => Promise<CreateOrderPort.Result>
}

export namespace CreateOrderPort {
  export type Body = CreateOrderRequestDTO

  export interface Result {
    data: CreateOrderResponseDTO | null
    code?: string
    message?: string
  }
}
