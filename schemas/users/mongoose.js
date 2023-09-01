import { Schema } from 'mongoose';
import { validationMap } from '../../constants/index.js';
import { setMongooseShapeNormalizeAll } from '../../helpers/index.js';

const { name, email, password } = validationMap;

const shape = {
  name: {
    type: String,
    required: true,
    match: [name.pattern, name.message],
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
    maxLength: password.max,
    match: [password.pattern, password.mesage],
  },

  token: {
    type: String,
    default: null,
  },

  avatarUrl: {
    type: String,
    default: null,
  },

  verified: {
    type: Boolean,
    default: false,
  },

  subscription: {
    type: String,
    default: '',
  },

  verificationToken: {
    type: String,
    default: null,
  },
};

// добавляем trim всем строковым полям
setMongooseShapeNormalizeAll(shape);

// убираем автодобавление поля с номером версии,
// инициируем автодобавление даты создания/обновления
const options = {
  versionKey: false,
  timestamps: true,
};

export const schema = new Schema(shape, options);
