// import { Schema } from 'mongoose'

import mongooseService from '../../common/service/mongoose.service'

const Schema = mongooseService.getMongoose().Schema

export const productDBSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, index: true },
    description: { type: String, required: true },
    currency: { type: String, required: true },
    seller_id: { type: String, required: true },
    in_stock: { type: Boolean, required: true },
    delivery_options: { type: Array, required: true }
  },
  { id: false }
)
