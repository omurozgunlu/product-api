// import { model } from 'mongoose'
import { productDBSchema } from './db.schema'
import mongooseService from '../../common/service/mongoose.service'

const model = mongooseService.getMongoose().model
export const ProductModel = model('Products', productDBSchema)
