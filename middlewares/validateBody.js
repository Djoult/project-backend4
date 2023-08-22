import { HttpError } from "../helpers/index.js";

const validateBody = (validationSchema) => {
  const validate = async (req, res, next) => {
    const { error } = validationSchema.validate(req.body);

    if (error) next(HttpError(400, error.message));

    next();
  };

  return validate;
};

export default validateBody;
