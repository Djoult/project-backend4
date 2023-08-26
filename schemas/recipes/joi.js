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

  about: Joi.string()
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
      //title,
      ingredientId: Joi.string()
        .required()
        .custom((v, helper) => {
          if (!isValidObjectId(v))
            return helper.message(`{{#label}}: Invalid id`);
        }),

      measure: Joi.string()
        .required()
        .pattern(measure.pattern)
        .min(measure.min)
        .messages({ '*': `{{#label}}: ${measure.message}` }),
    }),
  // .error(errors => {
  //   errors.forEach(err => {
  //     console.log(err.code);
  //     switch (err.code) {
  //     }
  //   });
  //   return errors;
  // }),
  //.messages({ '*': `{{#label}}: ${ingredients.message}` }),
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
