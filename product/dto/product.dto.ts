export interface ProductDTO {
  name: string
  price: number
  description: string
  currency: string
  seller_id: string
  in_stock: boolean
  delivery_options: deliveryDTO[]
}
export interface deliveryDTO {
  name: string
  price: number
  currency: string
}

export interface PatchProductDTO {
  id: string
  name?: string
  price?: number
  description?: string
  currency?: string
  seller_id?: string
  in_stock?: boolean
  delivery_options?: deliveryDTO[]
}

export interface ProductDocument {
  _id: string
  name: string
  price: number
  description: string
  currency: string
  seller_id: string
  in_stock: boolean
  delivery_options: deliveryDTO[]
}
