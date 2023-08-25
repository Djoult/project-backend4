import { Schema } from 'mongoose';

import {
  setMongooseShapeTrimAll,
  setMongooseShapeReserved,
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
  instructions,
  drinkThumb,
} = validationData;

const titleValidator = {
  type: String,
  required: true,
  match: [title.pattern, title.message],
  maxLength: title.maxLen,
};

//
// doc shape
//

const shape = {
  drink: titleValidator,

  aboutRecipe: {
    type: String,
    match: [about.pattern, about.message],
    maxLength: about.maxLen,
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
    maxLength: instructions.maxLen,
  },

  drinkThumb: {
    type: String,
    match: [drinkThumb.pattern, drinkThumb.message],
    default: null,
  },

  ingridients: {
    type: Array,
  },
};

// добавляем { trim: true } всем текстовым полям
setMongooseShapeTrimAll(shape);

// ставим зарезервированные поля в null
setMongooseShapeReserved(shape);

// убираем автодобавление поля с номером версии,
// инициируем автодобавление даты создания/обновления
const options = {
  versionKey: false,
  timestamps: true,
};

export const schema = new Schema(shape, options);
