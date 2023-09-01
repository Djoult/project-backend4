import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

import {
  setJoiShapeTrimAll,
  setJoiShapeReserved,
} from '../../helpers/index.js';

import {
  categoryList,
  glassList,
  reservedFields,
  validationMap,
} from '../../constants/index.js';

//
// constants
//

const {
  title: titleData,
  thumb: thumbData,
  aboutRecipe,
  instructions,
  drinkThumb,
  ingredients,
  measure,
} = validationMap;

const title = Joi.string()
  .required()
  .trim()
  .pattern(titleData.pattern)
  .max(titleData.max)
  .messages({ '*': `{{#label}}: ${titleData.message}` });

// const thumb = Joi.string()
//   .required()
//   .pattern(thumbData.pattern)
//   .messages({ '*': `{{#label}}: ${thumbData.message}` });

//
// doc shape
//

const shape = {
  drink: title,

  about: Joi.string()
    .pattern(aboutRecipe.pattern)
    .max(aboutRecipe.max)
    .default(null)
    .messages({ '*': `{{#label}}: ${aboutRecipe.message}` }),

  category: Joi.string()
    .required()
    .lowercase()
    .valid(...categoryList.map(itm => itm.toLocaleLowerCase()))
    .messages({ '*': `{{#label}}: Unknown value` }),

  glass: Joi.string()
    .required()
    .lowercase()
    .valid(...glassList.map(itm => itm.toLocaleLowerCase()))
    .messages({ '*': `{{#label}}: Unknown value` }),

  instructions: Joi.string()
    .required()
    .pattern(instructions.pattern)
    .max(instructions.max)
    .messages({
      '*': `{{#label}}: ${instructions.message}`,
    }),

  // !!! TODO: убрать после тестов
  users: Joi.array(),

  ingredients: Joi.array()
    .required()
    .items({
      title,
      measure: Joi.string()
        .trim()
        .required()
        .pattern(measure.pattern)
        .min(measure.min)
        .messages({ '*': `{{#label}}: ${measure.message}` }),
    }),
};

// добавляем trim() всем текстовым полям
setJoiShapeTrimAll(shape);

// ставим зарезервированные поля в null
setJoiShapeReserved(shape, reservedFields);

export const schema = {
  addRecipe: Joi.object(shape),
};
