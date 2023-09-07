import { HttpError } from '../helpers/index.js';
import { HTTP_STATUS } from '../constants/index.js';
import Joi from 'joi';

// joi валидация
export const validateBody = schema => {
  return async (req, res, next) => {
    try {
      if (Joi.isSchema(schema)) {
        schema.validate(req.body);
      }
      next();
    } catch (err) {
      next(HttpError(HTTP_STATUS.badRequest, err.message));
    }
  };
};
