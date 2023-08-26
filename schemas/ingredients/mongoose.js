import mongoose, { Schema } from 'mongoose';
import { validationMap } from '../../constants/index.js';

const { measure } = validationMap;

export const schema = new Schema(
  {
    _id: false,

    ingredientId: {
      type: Schema.Types.ObjectId,
      ref: 'ingredient',
      required: true,
    },

    measure: {
      type: String,
      required: true,
      minLength: measure.min,
      match: [measure.pattern, measure.message],
    },
  },
  {
    versionKey: false,
  }
);
