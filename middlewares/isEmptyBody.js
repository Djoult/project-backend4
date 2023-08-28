import { HttpError } from '../helpers/index.js';
import { HTTP_STATUS } from '../constants/index.js';

export const isEmptyBody = (req, res, next) => {
  if (Object.keys(req.body).length) return next();
  throw HttpError(HTTP_STATUS.badRequest, 'Body is empty');
};
