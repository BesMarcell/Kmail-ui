import Joi from 'joi';

export const joiSchema = {
  email: Joi.string().email().required().label(' '),
  password: Joi.string().min(6).required().label(' ')
};
