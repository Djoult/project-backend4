import jwt from "jsonwebtoken";
import { HttpError } from "../helpers/index.js";
import { User } from "../models/index.js";
import "dotenv/config";
const { JWT_SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer != "Bearer" || !token)
    return next(HttpError(401, "Not authorized"));

  try {
    const { id } = jwt.verify(token, JWT_SECRET_KEY);
    console.log(id);
    const user = await User.findById(id);
    if (!user || !user.token) {
      console.log(user);
      return next(HttpError(401, "Not authorized"));
    }

    req.user = user;

    next();
  } catch {
    next(HttpError(401, "Not authorized"));
  }
};

export default authenticate;
