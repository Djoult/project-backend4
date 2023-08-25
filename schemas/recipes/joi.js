import Joi from 'joi';

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
  aboutRecipe,
  instructions,
  drinkThumb,
  ingredients,
  measure,
} = validationMap;

const title = Joi.string()
  .required()
  .pattern(titleData.pattern)
  .max(titleData.max)
  .messages({ '*': `{{#label}}: ${titleData.message}` });

//
// doc shape
//

const shape = {
  drink: title,

  aboutRecipe: Joi.string()
    .pattern(aboutRecipe.pattern)
    .max(aboutRecipe.max)
    .default(null)
    .messages({ '*': `{{#label}}: ${aboutRecipe.message}` }),

  category: Joi.string()
    .required()
    .lowercase()
    .valid(...categoryList)
    .messages({ '*': `{{#label}}: Unknown value` }),

  glass: Joi.string()
    .required()
    .lowercase()
    .valid(...glassList)
    .messages({ '*': `{{#label}}: Unknown value` }),

  instructions: Joi.string()
    .required()
    .pattern(instructions.pattern)
    .max(instructions.max)
    .messages({
      '*': `{{#label}}: ${instructions.message}`,
    }),

  ingredients: Joi.array()
    .required()
    .items({
      title,
      measure: Joi.string()
        .required()
        .pattern(measure.pattern)
        .min(measure.min)
        .messages({ '*': `{{#label}}: ${measure.message}` }),
    })
    .messages({ '*': `{{#label}}: ${ingredients.message}` }),
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
//     drink: 'sfwqw',
//     category: 'shake',
//     glass: 'jar',
//     instructions: 'seqewqewqeewqeqweqweqweqs',
//     alcoholic: true,
//     video: null,
//     ingredients: [{ title: 'swq', measure: '2cl' }],
//   }).error?.details[0].message
// );
