import { HTTP_STATUS } from '../constants/http.js';
import { jwt, HttpError } from '../helpers/index.js';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  const [, authToken] = authorization?.match(/^Bearer\s+([^\s]+)$/) ?? '';

  if (authToken) {
    const { id } = jwt.verify(authToken);
    if (id) {
      const user = (req.user = await User.findById(id));
      if (user?.token) return next();
    }
  }

  throw HttpError(HTTP_STATUS.unauth);
};
