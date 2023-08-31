import express from 'express';
import { validateBody } from '../../decorators/index.js';
import { isEmptyBody, isValidId } from '../../middlewares/index.js';
import { joiSchema as schema } from '../../schemas/recipes/index.js';
import { ctrl } from '../../controllers/recipes/index.js';
import { isRecipeExists, authenticate } from '../../middlewares/index.js';

const router = express.Router();

// router.use(authenticate);

/**
 * добавление рецепта
 *
 * POST recipes/own
 */
router.post(
  '/own',
  isEmptyBody,
  isRecipeExists,
  validateBody(schema.addRecipe),
  ctrl.add
);

/**
 * список всех категорий
 *
 * GET recipes/category-list
 *    ?sort=[asc|desc]
 */
router.get('/category-list', ctrl.getCategoryList);

/**
 * список ингредиентов
 *
 *  GET recipes/ingredient-list
 *      ?title=..
 *      &page=..
 *      &limit=..
 *      &sort=[asc|desc]
 */
router.get('/ingredient-list', ctrl.getIngredientList);

/**
 * список рецпептов, указанных категорий для главной
 *
 * GET recipes/main-page
 *    ?category=..
 *    &samples=..
 *    &categoryCount=..
 *    &thumb=[true|false]
 *    &instructions=[true|false]
 */
router.get('/main-page', ctrl.getMainPageRecipes);

/**
 * поиск по критериям
 *
 * - recipes/search
 *      ?drink=..
 *      &category=..
 *      &ingredient=..
 *      &glass=..
 *      &own=[true|false]
 *      &favorite=[true|false]
 *      &thumb=[true|false]
 *      &instructions=[true|false]
 *      &sort=fieldName:[asc|desc]
 */
router.get('/search', ctrl.search);

router.get('/popular', ctrl.getPopularAll);

router.get('/favorite', ctrl.getFavoriteAll);

router.get('/favorite/:id', isValidId, ctrl.getFavoriteById);

router.patch('/favorite/:id', isValidId, ctrl.updateFavoriteById);

router.get('/own', ctrl.getOwnAll);

router.get('/own/:id', isValidId, ctrl.getOwnById);

router.delete('/own/:id', isValidId, ctrl.removeOwnById);

// получение одного рецепта по id
router.get('/:id', isValidId, ctrl.getById);

export default router;
