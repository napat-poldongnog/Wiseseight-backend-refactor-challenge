// * Request & Response DTOs
import type { InquiryOrderByIdRequestDTO } from './dtos/request/inquiryOrderByIdRequestDTO'
import type { InquiryOrderByIdResponseDTO } from './dtos/response/inquiryOrderByIdResponseDTO'

export interface InquiryOrderByIdPort {
  execute: (data: InquiryOrderByIdPort.Params) => Promise<InquiryOrderByIdPort.Result>
}

export namespace InquiryOrderByIdPort {
  export type Params = InquiryOrderByIdRequestDTO

  export interface Result {
    data: InquiryOrderByIdResponseDTO | null
    code?: string
    message?: string
  }
}
