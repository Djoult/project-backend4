import Joi from 'joi';

export const isStr = v => typeof v === 'string';
export const isFunc = v => typeof v === 'function';
export const isNum = v => !isNaN(v - parseFloat(v));
export const isInt = v => Number.isInteger(+v);
export const isEmptyObj = v => v && !Object.keys(v).length;
export const isArray = v => Array.isArray(v);

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
  const res = args?.map(v => {
    if (!isStr(v)) return '';
    return v.toLocaleLowerCase().replace(/\s+/g, ' ').trim();
  });

  return res.length > 1 ? res : res[0];
};

// ставит все параметры без значений в true
export const parseRequestQuery = (query = '') => {
  return Object.entries(query).reduce((res, [k, v]) => {
    // v - всегда строка, пустая - если значение не передано
    res[k] = v || 'true';
    return res;
  }, {});
};
