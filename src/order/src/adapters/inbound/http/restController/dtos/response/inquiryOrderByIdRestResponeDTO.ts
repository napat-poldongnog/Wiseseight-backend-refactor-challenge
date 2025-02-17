export interface InquiryOrderByIdRestResponeDTO {
  id: string
  userId: string
  product: ProductDetailDTO | null
  quantity: number
  totalPrice: number
}

export interface ProductDetailDTO {
  id: string
  name: string
  price: number
  stock: number
}
