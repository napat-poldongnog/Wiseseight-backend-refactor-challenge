// * Response DTOs
import type { InquiryAllProductResponseDTO } from './dtos/inquiryAllProductResponseDTO'

export interface InquiryAllProductPort {
  execute: () => Promise<InquiryAllProductPort.Result>
}

export namespace InquiryAllProductPort {
  export type Param = void

  export interface Result {
    data: InquiryAllProductResponseDTO[]
    code?: string
    message?: string
  }
}
