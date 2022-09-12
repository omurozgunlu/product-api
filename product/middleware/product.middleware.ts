import express from 'express'
import ProductService from '../services/product.service'
import debug from 'debug'
const log: debug.IDebugger = debug('app:stocks-controller')
import {
  ProductSchema,
  PatchProductSchema
} from '../requestschemas/validationSchema'
class ProductMiddleware {
  async validateGetSingleQuery(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.params && req.params.productId) {
      next()
    } else {
      res.status(400).send({
        error: 'Missing productId in the parameters.'
      })
    }
  }
  async validateCreateBody(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { error, value } = ProductSchema.validate(req.body)
    if (error) {
      res.status(400).send({
        error: 'Body ValidationError'
      })
    } else {
      next()
    }
  }
  async validatePatchBody(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { error, value } = PatchProductSchema.validate(req.body)
    log(JSON.stringify(error))
    if (error) {
      res.status(400).send({
        error: 'Body ValidationError'
      })
    } else {
      next()
    }
  }
  async validateListQuery(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.query && req.query.limit) {
      next()
    } else {
      res.status(400).send({
        error: 'Missing limit in query parameters.'
      })
    }
  }
}

export default new ProductMiddleware()
