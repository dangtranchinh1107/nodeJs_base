import Joi from "joi";

export const signUpValid = Joi.object({
    userName: Joi.string().required().min(6).max(255),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(255),
    comfirmPassword: Joi.string().required().min(6).max(255).valid((Joi.ref("password"))),
    role: Joi.string()
})

export const signInValid = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(255),
})