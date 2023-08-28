import { model } from 'mongoose';
import { mongooseSchema as schema } from '../schemas/ingredients/index.js';

// не будет редактироваться, нужна для агрегации и выборки
export const Ingredient = model('ingredient', schema);
