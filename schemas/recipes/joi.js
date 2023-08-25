import Joi from 'joi';

import {
  setJoiShapeTrimAll,
  setJoiShapeReserved,
} from '../../helpers/index.js';

import {
  categoryList,
  glassList,
  reservedFields,
  validationData,
} from '../../constants/index.js';

//
// constants
//

const {
  drink: title,
  aboutRecipe: about,
  measure,
  instructions,
  drinkThumb,
} = validationData;

const titleValidator = Joi.string()
  .pattern(title.pattern)
  .messages({
    'string.pattern.base': `{{#label}}: ${title.message}`,
  })
  .max(title.maxLen)
  .required();

//
// doc shape
//

const shape = {
  drink: titleValidator,

  aboutRecipe: Joi.string()
    .pattern(about.pattern)
    .messages({
      'string.pattern.base': `{{#label}}: ${about.message}`,
    })
    .max(about.maxLen)
    .default(null),

  category: Joi.string()
    .lowercase()
    .valid(...categoryList)
    .messages({ 'any.only': `{{#label}}: Invalid value` })
    .required(),

  glass: Joi.string()
    .lowercase()
    .valid(...glassList)
    .messages({ 'any.only': `{{#label}}: Invalid value` })
    .required(),

  instructions: Joi.string()
    .pattern(instructions.pattern)
    .messages({
      'string.pattern.base': `{{#label}}: ${instructions.message}`,
    })
    .max(instructions.maxLen)
    .required(),

  // drinkThumb: Joi.string()
  //   .pattern(drinkThumb.pattern)
  //   .messages({
  //     'string.pattern.base': `{{#label}}: ${drinkThumb.message}`,
  //   }),

  ingredients: Joi.array()
    .items({
      title: titleValidator,
      measure: Joi.string()
        .pattern(measure.pattern)
        .messages({
          'string.pattern.base': `{{#label}}: ${measure.message}`,
        })
        .min(measure.minLen)
        .required(),
    })
    .required(),
};

// добавляем trim() всем текстовым полям
setJoiShapeTrimAll(shape);

// ставим зарезервированные поля в null
setJoiShapeReserved(shape, reservedFields);

export const schema = {
  addRecipe: Joi.object(shape),
};

// console.log(
//   schema.addRecipe.validate({
//     drink: 'sf7',
//     category: 'Shake',
//     glass: 'jar',
//     instructions: 'seqewqewqeewqeqweqweqweqs',
//     alcoholic: true,
//     video: null,
//   }).error?.details
// );
