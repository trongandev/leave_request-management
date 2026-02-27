import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(5050),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES: Joi.string().default('1d'),
  MONGO_URI: Joi.string().required().default('mongodb://localhost:27017/lrm'),
});
