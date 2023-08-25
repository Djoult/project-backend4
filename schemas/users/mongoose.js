import { Schema } from 'mongoose';

const shape = {};

// убираем автодобавление поля с номером версии,
// инициируем автодобавление даты создания/обновления
const options = {
  versionKey: false,
  timestamps: true,
};

export const schema = new Schema(shape, options);
