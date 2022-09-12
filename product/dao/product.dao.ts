import debug from 'debug'
import mongooseService from '../../common/service/mongoose.service'
import { redisService } from '../../common/service/redis.service'
import {
  ProductDTO,
  PatchProductDTO,
  ProductDocument
} from '../dto/product.dto'
import { ProductModel } from '../DB/db.model'
import shortid from 'shortid'
const log: debug.IDebugger = debug('app:product-dao')

class ProductDAO {
  constructor() {
    log('Created new instance of ProductDAO')
  }
  async createProduct(product: ProductDTO) {
    const productId = shortid.generate()
    const newProduct = new ProductModel({
      _id: productId,
      ...product
    })
    await newProduct.save()
    return productId
  }
  async getProduct(productId: string) {
    const redisProduct = await redisService.get(productId)
    let dbProduct
    if (redisProduct) {
      log('found on redis')
      return redisProduct
    } else {
      log('record is not found on redis')
      dbProduct = await ProductModel.findById(productId).exec()
      if (dbProduct) await redisService.set(dbProduct._id, dbProduct)
      return dbProduct
    }
  }
  async updateProduct(product: PatchProductDTO) {
    const { id, ...productFields } = product
    const existingProduct = await ProductModel.findOneAndUpdate(
      { _id: id },
      { $set: productFields },
      { new: true }
    ).exec()
    return existingProduct
  }
  async listProducts(
    limit: number,
    page: number,
    orderBy?: number,
    sortBy?: string
  ) {
    log(`list product params ${limit},${page},${orderBy},${sortBy}`)
    const sort = sortBy ? sortBy : '_id'
    const order = orderBy && sortBy ? orderBy : -1
    const asc = order === -1 ? 'desc' : 'asc'
    const products = await ProductModel.find()
      .limit(limit)
      .sort({ [sort]: asc })
      .skip(page > 0 ? (page - 1) * limit : 0)
      .exec()
    return products
  }
}
export default new ProductDAO()
