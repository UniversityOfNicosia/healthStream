import Joi from "joi";

export const ConfigSchema = Joi.object({
  PORT: Joi.number().required().default(3000),
  DATABASE_PORT:Joi.number().required().default(3306),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET:Joi.string().required()
 })
.required();