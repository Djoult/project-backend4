import { validationMap } from '../../constants/index.js';
import { Schema } from 'mongoose';
import { setMongooseShapeTrimAll } from '../../helpers/index.js';

const { name, email, password } = validationMap;

const shape = {
  name: {
    type: String,
    required: true,
    match: [name.pattern, name.message],
    set: name.normalizer,
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: email.validator,
      message: email.message,
    },
  },

  password: {
    type: String,
    required: true,
    minlength: password.min,
  },

  token: {
    type: String,
    default: null,
  },

  avatarUrl: {
    type: String,
  },

  verified: {
    type: Boolean,
    default: false,
  },

  verificationCode: {
    type: String,
    default: null,
  },
};

// добавляем trim всем строковым полям
setMongooseShapeTrimAll(shape);

// убираем автодобавление поля с номером версии,
// инициируем автодобавление даты создания/обновления
const options = {
  versionKey: false,
  timestamps: true,
};

export const schema = new Schema(shape, options);
