import Joi from 'joi';
import fs from 'fs/promises';

export const isStr = v => typeof v === 'string';
export const isFunc = v => typeof v === 'function';
export const isNum = v => !isNaN(v - parseFloat(v));
export const isInt = v => Number.isInteger(+v);
export const isPositiveInt = v => isInt(v) && v > 0;
export const isEmptyObj = v => v && !Object.keys(v).length;
export const isArray = v => Array.isArray(v);
export const isNonEmptyArray = v => isArray(v) && v.length;

// joi-валидатор для email
export const isValidEmail = (v, options = { minDomainSegments: 2 }) => {
  const { error } = Joi.string().email(options).validate(v);
  return !error;
};

//
// num
//

export const fitIntoRange = (value, min, max, defValue) => {
  value = isNum(value) ? value : defValue;
  min = isNum(min) ? min : -Infinity;
  max = isNum(max) ? max : Infinity;
  return Math.max(min, Math.min(max, value));
};

export const rndInt = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

//
// str
//

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

export const capitalize = (s, allWords = true) => {
  const re = RegExp('(?<=\\s|^)\\w', allWords ? 'g' : '');
  return s.replace(re, m => m.toLocaleUpperCase());
};

//
// misc
//

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

  return Array.from(
    { length: fitIntoRange(count, 0, src.length, src.length) },
    () => src.splice(rndInt(0, src.length - 1), 1)[0]
  );
};

//
// fs
//

export const checkFileExists = async path => {
  try {
    (await fs.stat(path)).isFile();
  } catch (err) {
    throw err;
    //if (err.code === 'ENOENT') throw err;
  }
};

// export const isFileExists = async path => {
//   try {
//     await checkFileExists(path);
//     return true;
//   } catch {}
//   return false;
// };
