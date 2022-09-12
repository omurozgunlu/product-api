import { CommonRoutesConfig } from '../common/common.routes.config'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './output.json'

export class SwaggerRoute extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'SwaggerRoute')
  }
  configureRoutes() {
    this.app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

    return this.app
  }
}
