import express from 'express';
import { validateBody } from '../../decorators/index.js';
import { isEmptyBody, isValidId } from '../../middlewares/index.js';
import { joiSchema as schema } from '../../schemas/recipes/index.js';
import { ctrl } from '../../controllers/recipes/index.js';

export const router = express.Router();

// router.use(':id', isValidId);

// добавление рецепта
router.post('/own', isEmptyBody, validateBody(schema.addRecipe), ctrl.add);

// список всех категорий
router.get('/category-list', ctrl.getCategoryList);

// посик по названию, категории и ингредиенту
// recipes/search?drink=...&category=...&ingredient=...
router.get('/search', ctrl.search);

// получение одного рецепта по id
router.get('/:id', isValidId, ctrl.getById);
