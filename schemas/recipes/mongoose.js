import { Schema } from 'mongoose';

import {
  setMongooseShapeTrimAll,
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

const {
  title: titleData,
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

//
// doc shape
//

const shape = {
  drink: title,

  aboutRecipe: {
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

  ingridients: {
    type: Array,
  },

  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
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
