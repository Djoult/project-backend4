import Joi from 'joi';

export const isStr = v => typeof v === 'string';
export const isFunc = v => typeof v === 'function';
export const isNum = v => !isNaN(v - parseFloat(v));
export const isInt = v => Number.isInteger(+v);
export const isPositiveInt = v => isInt(v) && v > 0;
export const isEmptyObj = v => v && !Object.keys(v).length;
export const isArray = v => Array.isArray(v);

export const fitIntoRange = (value, min, max, defValue) => {
  value = isNum(value) ? value : defValue;
  min = isNum(min) ? min : -Infinity;
  max = isNum(max) ? max : Infinity;
  return Math.max(min, Math.min(max, value));
};

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
    // Конвертим все в строку на случай,
    // если в req.query будут доавлены параметры из кода
    // (Например, req.query = { ...req.query, favorite: true };)
    res[k] = String(v || true);
    return res;
  }, {});
};

export const rndInt = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

/**
 *
 * Делает выборку случайных элементов из заданного массива
 *
 * @param {array} arr - исходный массив
 * @param {number} count - размер выборки
 * @returns {array} - подмассив со случайными элементами
 */
export const getRandomElements = (arr, count) => {
  if (!isArray(arr)) return;

  const src = [...arr];
  const length = fitIntoRange(count, 0, src.length, src.length);

  return Array.from({ length }, el => {
    const idx = rndInt(0, src.length - 1);
    return src.splice(idx, 1) && src[idx];
  });
};
