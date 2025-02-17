// * Request & Response DTOs
import type { RegisterRequestDTO } from './dtos/registerRequestDTO'
import type { RegisterResponseDTO } from './dtos/registerResponseDTO'

export interface RegisterPort {
  execute: (data: RegisterPort.Body) => Promise<RegisterPort.Result>
}

export namespace RegisterPort {
  export type Body = RegisterRequestDTO

  export interface Result {
    data: RegisterResponseDTO | null
    code?: string
    message?: string
  }
}
