import Joi from "joi";

const userSignUp = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const userSignIn = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const userEmail = Joi.object({
    email: Joi.string().email().required(),
  });

export default {
  userSignUp,
  userSignIn,
  userEmail
};
