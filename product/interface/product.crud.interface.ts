import { ProductDTO, PatchProductDTO } from '../dto/product.dto'

export interface CRUD {
  createProduct: (product: ProductDTO) => Promise<any>
  updateProduct: (product: PatchProductDTO) => Promise<any>
  getProduct: (id: string) => Promise<any>
  listProducts: (
    limit: number,
    page: number,
    orderBy: number,
    sortBy: string | null
  ) => Promise<any>
}
