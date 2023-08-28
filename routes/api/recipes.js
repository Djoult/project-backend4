import express from 'express';
import { validateBody } from '../../decorators/index.js';
import { isEmptyBody, isValidId } from '../../middlewares/index.js';
import { joiSchema as schema } from '../../schemas/recipes/index.js';
import { ctrl } from '../../controllers/recipes/index.js';

const router = express.Router();

// router.use(':id', isValidId);

// добавление рецепта
router.post('/own', isEmptyBody, validateBody(schema.addRecipe), ctrl.add);

// список всех категорий
// recipes/category-list?sort={asc|desc}
router.get('/category-list', ctrl.getCategoryList);

// список ингредиентов
// recipes/ingredients-list?page=..&limit=..&title=..
router.get('/ingredients-list', ctrl.getIngredientList);

// посик по названию, категории и ингредиенту
// recipes/search?drink=...&category=...&ingredient=...&page=..&limit=..
router.get('/search', ctrl.search);

// получение одного рецепта по id
router.get('/:id', isValidId, ctrl.getById);

export default router;
