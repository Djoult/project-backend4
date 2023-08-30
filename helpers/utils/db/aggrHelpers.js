import { normalizeStr, isArray } from '../index.js';

export const literal = s => {
  return { $literal: `${s}` };
};

export const concat = (...args) => {
  return { $concat: [...args] };
};

export const mergeObj = (...args) => {
  return { $mergeObjects: [...args] };
};

export const push = (accum, data) => {
  return { [accum]: { $push: data } };
};

export const unwind = (path, preserveNullAndEmptyArrays = true) => ({
  $unwind: { path, preserveNullAndEmptyArrays },
});

export const regex = (v, targetField, wholeWord = false) => {
  if (!v) return;
  const list = isArray(v) ? v : [v];
  const res = list.map(s => normalizeStr(s)).join('|');
  const pat = { $regex: RegExp(wholeWord ? `^${res}$` : `${res}`, 'i') };

  return targetField ? { [targetField]: pat } : pat;
};

export const regexMatch = (input, regex, options = 'i') => ({
  $match: { $expr: { $regexMatch: { input, regex, options } } },
});

export const removeFields = (...args) => ({
  $project: args?.reduce((res, fieldName) => {
    res[fieldName] = 0;
    return res;
  }, {}),
});
