const Joi = require('joi');

export const TodoSchema = Joi.string().min(3).max(100).required();

