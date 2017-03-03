import Joi from 'joi';

export const joiSchema = {
  email: Joi.string().email().required(),
  nickname: Joi.string().min(3).max(15).required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  password: Joi.string().min(6).max(20).required(),
  confirmPassword: Joi.string().required().valid(Joi.ref('password'))
};
