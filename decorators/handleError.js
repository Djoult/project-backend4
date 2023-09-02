import { isFunc } from '../helpers/index.js';

export const handleError = cb => {
  return async (err, req, res, next) => {
    isFunc(cb) && (await cb(req));
    next(err);
  };
};
