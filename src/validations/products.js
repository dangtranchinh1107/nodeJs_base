import Joi from "joi";

const productSchema = Joi.object({
    name: Joi.string().required().min(6).max(225),
    price: Joi.number().required().min(0),
    description: Joi.string().required().min(6).max(1024),
    categoryId: Joi.string().required()
})

export default productSchema;