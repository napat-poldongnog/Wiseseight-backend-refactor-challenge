// * Response DTOs
import type { InquiryProductByIdResponseDTO } from './dtos/response/inquiryProductByIdResponseDTO'

export interface InquiryProductByIdPort {
  execute: (productId: string) => Promise<InquiryProductByIdPort.Result>
}

export namespace InquiryProductByIdPort {
  export type Param = string

  export interface Result {
    data: InquiryProductByIdResponseDTO | null
    code?: string
    message?: string
  }
}
