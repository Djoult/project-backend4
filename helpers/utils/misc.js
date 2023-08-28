import Joi from 'joi';

export const isStr = v => typeof v === 'string';
export const isFunc = v => typeof v === 'function';
export const isNum = v => !isNaN(v - parseFloat(v));
export const isInt = v => isNum(v) && Number.isInteger(+v);
export const isEmptyObj = v => v && !Object.keys(v).length;

export const isNonEmptyArray = v => {
  return Array.isArray(v) && v.length;
};

// joi-валидатор для email
export const isValidEmail = (v, options = { minDomainSegments: 2 }) => {
  const { error } = Joi.string().email(options).validate(v);
  console.log('isValidEmail', v);
  return !error;
};

export const normalizeStr = (...args) => {
  return args?.map(v => {
    if (!isStr(v)) return '';
    return v.toLocaleLowerCase().replace(/\s+/g, ' ').trim();
  });
};
