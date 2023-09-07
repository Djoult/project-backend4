import { isFunc } from '../helpers/index.js';

export const handleError = cb => {
  return async (err, req, res, next) => {
    try {
      isFunc(cb) && (await cb(req));
    } catch {
      next(err);
    }
  };
};
