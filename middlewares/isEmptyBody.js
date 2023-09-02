import { HttpError } from '../helpers/index.js';
import { HTTP_STATUS } from '../constants/index.js';

export const isEmptyBody = ({ body }, res, next) => {
  if (Object.keys(body).length) return next();
  throw HttpError(HTTP_STATUS.badRequest, 'Body is empty');
};
