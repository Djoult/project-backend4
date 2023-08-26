import mongoose, { Schema } from 'mongoose';
import { mongooseSchema as ingredientSchema } from '../ingredients/index.js';

import {
  setMongooseShapeNormalizeAll,
  setMongooseShapeReserved,
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

const { ObjectId } = Schema.Types;

const {
  title: titleData,
  measure,
  aboutRecipe,
  instructions,
  drinkThumb,
} = validationMap;

const title = {
  type: String,
  required: true,
  match: [titleData.pattern, titleData.message],
  maxLength: titleData.max,
};

const userRef = {
  type: ObjectId,
  ref: 'user',
};

//
// doc shape
//

const shape = {
  drink: title,

  about: {
    type: String,
    match: [aboutRecipe.pattern, aboutRecipe.message],
    maxLength: aboutRecipe.max,
    default: null,
  },

  category: {
    type: String,
    required: true,
    lowercase: true,
    enum: {
      values: categoryList,
      message: 'Invalid value',
    },
  },

  glass: {
    type: String,
    required: true,
    lowercase: true,
    enum: {
      values: glassList,
      message: 'Invalid value',
    },
  },

  instructions: {
    type: String,
    required: true,
    match: [instructions.pattern, instructions.message],
    maxLength: instructions.max,
  },

  drinkThumb: {
    type: String,
    match: [drinkThumb.pattern, drinkThumb.message],
    default: null,
  },

  ingredients: {
    type: [ingredientSchema],
    required: true,
  },

  // массив id тех, кто добавил рецепт в favorites
  users: {
    type: [userRef],
    default: [],
  },

  // owner: {
  //   ...userRef,
  //   required: true,
  // },
};

// добавляем { trim: true } всем текстовым полям
setMongooseShapeNormalizeAll(shape);

// ставим зарезервированные поля в null
//setMongooseShapeReserved(shape, reservedFields);

const schemaOptions = {
  versionKey: false,
  timestamps: true,
};

export const schema = new Schema(shape, schemaOptions);
