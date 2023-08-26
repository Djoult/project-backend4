import { HttpError } from '../helpers/index.js';

const isEmptyBody = (req, _, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    next(HttpError(400, `The fields must be required`));
  }
  next();
};

export default isEmptyBody;
