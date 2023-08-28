import { Schema, model } from 'mongoose';
import { mongooseSchema as schema } from '../schemas/users/index.js';
import * as hook from './hooks.js';

// валидация при обновлении
schema.pre('findOneAndUpdate', hook.handlePreUpdateValidate);

// обработка ошибок при обновлении и добавлении
schema.post('findOneAndUpdate', hook.handlePostSaveError);
schema.post('save', hook.handlePostSaveError);

export const User = model('user', schema);

export default User;
