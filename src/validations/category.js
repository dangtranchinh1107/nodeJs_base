import Joi from "joi";

const categorySchema = Joi.object({
    name: Joi.string().required().min(6).max(225),
    slug: Joi.string().required().min(6).max(225),
    products: Joi.array()
})

export default categorySchema;