import { CommonRoutesConfig } from '../common/common.routes.config'
import express from 'express'
import productMiddleware from './middleware/product.middleware'
import productController from './controllers/product.controller'

export class ProductRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'ProductRoutes')
  }
  configureRoutes() {
    this.app
      .route(`/product/:productId`)
      .get(
        productMiddleware.validateGetSingleQuery,
        productController.getProductDetails
      )
    this.app
      .route(`/product`)
      .post(
        productMiddleware.validateCreateBody,
        productController.createProduct
      )
      .patch(
        productMiddleware.validatePatchBody,
        productController.updateProduct
      )
    this.app
      .route(`/listProducts`)
      .get(
        productMiddleware.validateListQuery,
        productController.getProductListing
      )

    return this.app
  }
}
