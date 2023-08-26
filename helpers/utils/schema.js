import Joi from 'joi';
import { isNonEmptyArray } from './misc.js';

// добавлят вызов trim() всем строковым полям
export const setJoiShapeTrimAll = shape => {
  Object.entries(shape).forEach(([key, field]) => {
    if (field.type === 'string') shape[key] = field.trim();
  });
};

// добавляет в shape поля с именами из reserved
// с типом any и дефолтным null
export const setJoiShapeReserved = (shape, reserved) => {
  if (!isNonEmptyArray(reserved)) return;

  reserved.forEach(fieldName => {
    shape[fieldName] = Joi.any().default(null);
  });
};

// добавлят свойство { trim: true } всем строковым полям
export const setMongooseShapeTrimAll = shape => {
  Object.entries(shape).forEach(([, field]) => {
    if (field.type === String) field.trim = true;
  });
};

// добавляет в shape поля с именами из reserved
// с типом any и дефолтным null
export const setMongooseShapeReserved = (shape, reserved) => {
  if (!isNonEmptyArray(reserved)) return;

  reserved.forEach(fieldName => {
    shape[fieldName] = { default: null };
  });
};
