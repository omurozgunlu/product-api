import Joi from 'joi'

export const ProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  currency: Joi.string().required(),
  seller_id: Joi.string().required(),
  in_stock: Joi.boolean().required(),
  delivery_options: Joi.array().required()
})
export const PatchProductSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().optional(),
  price: Joi.number().optional(),
  description: Joi.string().optional(),
  currency: Joi.string().optional(),
  seller_id: Joi.string().optional(),
  in_stock: Joi.boolean().optional(),
  delivery_options: Joi.array().optional()
})
