import ProductDao from '../dao/product.dao'
import { CRUD } from '../interface/product.crud.interface'
import { ProductDTO, PatchProductDTO } from '../dto/product.dto'
import debug from 'debug'
const log: debug.IDebugger = debug('app:product-service')

class ProductService implements CRUD {
  async createProduct(product: ProductDTO) {
    const productId = await ProductDao.createProduct(product)
    return productId
  }
  async updateProduct(product: PatchProductDTO) {
    const updatedProduct = await ProductDao.updateProduct(product)
    return updatedProduct
  }
  async getProduct(id: string) {
    const product = await ProductDao.getProduct(id)
    return product
  }
  async listProducts(
    limit: number,
    page: number,
    orderBy: number,
    sortBy: string | null
  ) {
    if (sortBy)
      return await ProductDao.listProducts(limit, page, orderBy, sortBy)
    else return await ProductDao.listProducts(limit, page)
  }
}
export default new ProductService()
