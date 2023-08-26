import { model } from 'mongoose';
import { mongooseSchema as schema } from '../schemas/ingredients/index.js';

// Без регистрации ошибка при попытке сделать populate('ingredients.ingredientId')
// MissingSchemaError: Schema hasn't been registered for model "ingredient".
model('ingredient', schema);
