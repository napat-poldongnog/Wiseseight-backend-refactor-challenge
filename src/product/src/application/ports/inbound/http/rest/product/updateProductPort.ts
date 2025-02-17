// * Response DTOs
import type { UpdateProductRequestDTO } from './dtos/request/updateProductRequestDTO'
import type { UpdateProductResponseDTO } from './dtos/response/updateProductResponseDTO'

export interface UpdateProductPort {
  execute: (productId: string) => Promise<UpdateProductPort.Result>
}

export namespace UpdateProductPort {
  export type Body = UpdateProductRequestDTO

  export interface Result {
    data: UpdateProductResponseDTO | null
    code?: string
    message?: string
  }
}
