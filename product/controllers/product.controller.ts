import express from 'express'
import productService from '../services/product.service'
import debug from 'debug'

const log: debug.IDebugger = debug('app:stocks-controller')

class ProductController {
  async getProductDetails(req: express.Request, res: express.Response) {
    const productId = req.params.productId
    const productDetails = await productService.getProduct(productId)
    res.json(productDetails)
  }
  async createProduct(req: express.Request, res: express.Response) {
    const body = req.body
    const productId = await productService.createProduct(body)
    res.json({ id: productId })
  }
  async updateProduct(req: express.Request, res: express.Response) {
    const body = req.body
    const productDetails = await productService.updateProduct(body)
    res.json(productDetails)
  }
  async getProductListing(req: express.Request, res: express.Response) {
    const limit = Number(req.query.limit)
    const page = req.query.page ? Number(req.query.page) : 0
    const orderBy =
      req.query && req.query.orderBy ? Number(req.query.orderBy) : 1 //desc
    const sortBy =
      req.query && req.query.sortBy ? req.query.sortBy.toString() : null //price
    const products = await productService.listProducts(
      limit,
      page,
      orderBy,
      sortBy
    )
    res.json(products)
  }
}
export default new ProductController()
