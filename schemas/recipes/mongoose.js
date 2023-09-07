import { Schema } from 'mongoose';
import { mongooseSchema as ingredientSchema } from '../ingredients/index.js';

import {
  capitalize,
  setMongooseShapeNormalizeAll,
  setMongooseShapeReserved,
} from '../../helpers/index.js';

import {
  categoryList,
  glassList,
  reservedFields,
  validationMap,
} from '../../constants/index.js';

const { ObjectId } = Schema.Types;

const {
  title: titleData,
  thumb,
  measure,
  aboutRecipe,
  instructions,
} = validationMap;

//
// helpers
//

const title = {
  type: String,
  required: true,
  match: [titleData.pattern, ({ path }) => `"${path}": ${titleData.message}`],
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
    match: [
      aboutRecipe.pattern,
      ({ path }) => `"${path}": ${aboutRecipe.message}`,
    ],
    maxLength: aboutRecipe.max,
    default: '',
  },

  category: {
    type: String,
    required: true,
    validate: {
      validator: v => {
        return categoryList
          .map(itm => itm.toLocaleLowerCase())
          .includes(v.toLocaleLowerCase());
      },
      message: ({ path }) => `"${path}": Unknown value`,
    },
  },

  glass: {
    type: String,
    required: true,
    validate: {
      validator: v => {
        return glassList
          .map(itm => itm.toLocaleLowerCase())
          .includes(v.toLocaleLowerCase());
      },
      message: ({ path }) => `"${path}": Unknown value`,
    },
  },

  instructions: {
    type: String,
    required: true,
    match: [
      instructions.pattern,
      ({ path }) => `"${path}": ${instructions.message}`,
    ],
    maxLength: instructions.max,
  },

  drinkThumb: {
    type: String,
    match: [thumb.pattern, ({ path }) => `"${path}": ${thumb.message}`],
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

  owner: {
    ...userRef,
    required: true,
  },
};

// добавляем { trim: true } всем текстовым полям
setMongooseShapeNormalizeAll(shape);

// в БД, для указанных полей, пишем каждое слово с заглавной
shape.drink.set = shape.category.set = shape.glass.set = capitalize;

// ставим зарезервированные поля в null
setMongooseShapeReserved(shape, reservedFields);

const schemaOptions = {
  versionKey: false,
  timestamps: true,
};

export const schema = new Schema(shape, schemaOptions);
