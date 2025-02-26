import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  userType: Joi.string().valid('admin', 'user').default('user'),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(8).required(),
});

export const updateProfileSchema = Joi.object({
  name: Joi.string().max(50),
  email: Joi.string().email(),
}).min(1);

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(8).required(),
});