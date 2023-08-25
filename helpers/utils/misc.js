import Joi from 'joi';

export const isStr = v => typeof v === 'string';
export const isFunc = v => typeof v === 'function';
export const isNum = v => !isNaN(v - parseFloat(v));

export const isNonEmptyArray = v => {
  return Array.isArray(v) && v.length;
};

// joi-валидатор для email
export const isValidEmail = (v, options = { minDomainSegments: 2 }) => {
  const { error } = Joi.string().email(options).validate(v);
  return !error;
};
