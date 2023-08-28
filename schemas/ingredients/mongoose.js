import { Schema } from 'mongoose';
import { validationMap } from '../../constants/index.js';

const { title: titleData, measure } = validationMap;

const shape = {
  _id: false,

  title: {
    type: String,
    required: true,
    match: [titleData.pattern, titleData.message],
    maxLength: titleData.max,
  },

  measure: {
    type: String,
    required: true,
    minLength: measure.min,
    match: [measure.pattern, measure.message],
  },
};

export const schema = new Schema(shape, { versionKey: false });
