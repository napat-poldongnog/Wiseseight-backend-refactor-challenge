// * Response DTOs
import type { UpdateProductRequestDTO } from './dtos/updateProductRequestDTO'
import type { UpdateProductResponseDTO } from './dtos/updateProductResponseDTO'

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
