export interface InquiryOrderByIdResponseDTO {
  id: string
  userId: string
  product: ProductDetailResponseDTO | null
  quantity: number
  totalPrice: number
}

export interface ProductDetailResponseDTO {
  id: string
  name: string
  price: number
  stock: number
}
