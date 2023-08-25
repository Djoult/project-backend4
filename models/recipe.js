import { Schema, model } from 'mongoose';
import { mongooseSchema as schema } from '../schemas/recipes/index.js';
import { hook } from './hooks.js';

// валидация при обновлении
schema.pre('findOneAndUpdate', hook.handlePreUpdateValidate);

// обработка ошибок при обновлении и добавлении
schema.post('findOneAndUpdate', hook.handlePostSaveError);
schema.post('save', hook.handlePostSaveError);

export const Recipe = model('recipe', schema);

export default Recipe;

// Recipe.create({});
