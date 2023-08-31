import Joi from 'joi';

// добавлят вызов trim() всем строковым полям
export const setJoiShapeTrimAll = shape => {
  Object.entries(shape).forEach(([key, field]) => {
    if (field.type === 'string') shape[key] = field.trim();
  });
};

// добавляет в shape поля с именами из reserved
// с типом any и дефолтным null
export const setJoiShapeReserved = (shape, reserved) => {
  Object.entries(reserved ?? '').forEach(([fieldName, typeName]) => {
    const instance = Joi[typeName.toLowerCase()]();
    shape[fieldName] = instance.default(null);
  });
};

// добавлят свойство { trim: true } всем строковым полям
export const setMongooseShapeNormalizeAll = shape => {
  Object.entries(shape).forEach(([fieldName, fieldData]) => {
    if (fieldData.type !== String) return;

    fieldData.trim = true;
    fieldData.set = v => v?.replace(/\s+/g, ' ');
  });
};

// добавляет в shape поля с именами из reserved
// с типом any и дефолтным null
export const setMongooseShapeReserved = (shape, reserved) => {
  // type надо указывать, иначе будет ошибка
  Object.entries(reserved ?? '').forEach(([fieldName, typeName]) => {
    shape[fieldName] = {
      type: global[typeName],
      default: null,
    };
  });
};
