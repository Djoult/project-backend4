import mongoose from 'mongoose';
import 'dotenv/config';

const SORT_ORDER = {
  asc: 1,
  desc: -1,
};

const REGEXP = {
  reason: /^(?:[^:]+:){2}\s+(.+)$/,
  collectionName: /^.+:\s+(.+)\s+index/,
  singleDupKey: /{\s+(.+):.+\}$/,
};

const connect = async (dbName, varName = 'DB_HOST') => {
  const uri = process.env[varName].replace('<db_name>', dbName || '');
  if (process.env.NODE_ENV === 'development') console.log(uri);

  return await mongoose.connect(uri);
};

const parseValidationErrorMessage = errOrMsg => {
  const message = errOrMsg?.message ?? errOrMsg ?? '';
  // premsg1: premsg2: reason
  const [, reason] = message.match(REGEXP.reason);

  return { reason };
};

const parseDupKeyErrorMessage = errOrMsg => {
  const message = errOrMsg?.message ?? errOrMsg ?? '';

  // имя коллекции может содержать пробелы и тп
  const [, collection] = message.match(REGEXP.collectionName);
  // для случая с индексом по отдельным полям (некомбинированного)
  const [, key] = message.match(REGEXP.singleDupKey);

  return {
    key,
    collection,
  };
};

const makeObjectId = s => {
  return new mongoose.Types.ObjectId(s);
};

// fieldName:[asc|desc]
export const parseSortQueryParam = param => {
  let [fieldName, order = 'asc'] = param?.split(':') ?? '';
  // (!) fieldName нельзя делать lowerCase
  return {
    fieldName: fieldName?.trim(),
    order: SORT_ORDER[order] ?? SORT_ORDER['asc'],
  };
};

export const db = {
  connect,
  parseSortQueryParam,
  parseDupKeyErrorMessage,
  parseValidationErrorMessage,
  makeObjectId,
};
