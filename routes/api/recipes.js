import express from 'express';
import {
  validateBody,
  uploadSingleImage,
  uploadImage,
} from '../../decorators/index.js';
import { joiSchema as schema } from '../../schemas/recipes/index.js';
import { ctrl } from '../../controllers/recipes/index.js';

import {
  isRecipeExists,
  authenticate,
  parseBody,
} from '../../middlewares/index.js';

import {
  isEmptyBody,
  isValidId,
  processDrinkThumb,
  removeDrinkThumbOnError,
} from '../../middlewares/index.js';

const router = express.Router();

router.use(authenticate);

/**
 *
 *******************************************************
 * Добавление рецепта
 *
 * POST recipes/own
 */
router.post(
  '/own',
  uploadSingleImage('drinkThumb'),
  isEmptyBody,
  parseBody,
  isRecipeExists,
  processDrinkThumb,
  validateBody(schema.addRecipe),
  ctrl.add,
  removeDrinkThumbOnError
);

/**
 *
 *******************************************************
 * Список всех категорий с возможностью сортировки.
 * По умолчанию сортирует по алфавиту (asc -> ascending)
 *
 * GET recipes/category-list
 *    ?sort=[asc|desc]
 *
 * Вернет массив имен категорий
 * [ "Beer", "Cocktail",... ]
 */
router.get('/category-list', authenticate, ctrl.getCategoryList);

/**
 *
 *******************************************************
 * Список ингредиентов
 *    title - список имен ингредиентов, которые попадут в выборку
 *
 *  GET recipes/ingredient-list
 *      ?title=..
 *      &page=..
 *      &limit=..
 *      &sort=[asc|desc]
 *
 * Вернет объект { page, limit, totalHits, hits }, где
 *    hits - массив ингредиентов,
 *    totalHits - общее кол-во рецептов, соотвествующих заданным критериям
 *    page - текущая страница выдачи
 *    limit - кол-во рецептов на одну страницу
 */
router.get('/ingredient-list', ctrl.getIngredientList);

/**
 *
 *******************************************************
 * Список рецпептов заданных категорий для главной страницы
 *    samples - кол-во случайных рецептов каждой из категорий
 *    categoryCount - кол-во случайных категорий, из которых выбираются рецепты
 *    category - список имен категорий (будет проигнорирован, если задан categoryCount)
 *
 * GET recipes/main-page
 *    ?category=..
 *    &samples=..
 *    &categoryCount=..
 *    &thumb=[true|false]
 *    &instructions=[true|false]
 *
 * Вернет массив, где hits - массив случайных рецептов для заданной категории
 * [ { category: ..., hits:[] }, { category: ..., hits:[] } ]
 * или пустой массив [], если ничего, соотвествующего критериям, не найдено
 */
router.get('/main-page', ctrl.getMainPageRecipes);

/**
 *
 *******************************************************
 * Поиск по заданным критериям (можно завдавать любые их комбинации)
 * с возможностью сортировки по одному полю
 *
 * GET recipes/search
 *      ?drink=..
 *      &category=..
 *      &ingredient=..
 *      &glass=..
 *      &page=..
 *      &limit=..
 *      &own=[true|false]
 *      &favorite=[true|false]
 *      &thumb=[true|false]
 *      &instructions=[true|false]
 *      &sort=fieldName:[asc|desc]
 *
 *  Вернет объект { page, limit, totalHits, hits }, где
 *    hits - массив ингредиентов,
 *    totalHits - общее кол-во рецептов, соотвествующих заданным критериям
 *    page - текущая страница выдачи
 *    limit - кол-во рецептов на одну страницу
 */
router.get('/search', ctrl.search);

/**
 *
 *******************************************************
 * Cписок рецептов, добавленных юзерами в избранное
 * Возможна фильтрация по тем же полям, что и для recipes/search
 *
 * Например, recipes/popular?ingredient=port&category=ordinary drink
 * Вернет популярные рецепты в которых есть ингредиент с названием "port" и
 * которые относятся к категории "Ordinary drink"
 *
 * GET recipes/popular?[фильтры...]
 *
 *  Вернет объект, где hits - массив ингредиентов
 * { page, limit, totalHits, hits }
 */
router.get('/popular', ctrl.getPopularAll);

/**
 *
 *******************************************************
 * Список рецептов, которые текущий юзер добавил в избранное
 * (Рецпты, в массиве users которых есть id текущего юзера)
 * Возможна фильтрация по тем же полям, что и для recipes/search
 * (см. пример для recipes/popular)
 *
 * GET recipes/favorite?[фильтры...]
 *
 *  Вернет объект, где hits - массив ингредиентов
 * { page, limit, totalHits, hits }
 */
router.get('/favorite', ctrl.getFavoriteAll);

/**
 *
 * ******************************************************
 * Рецепт по id, который добавлен текущим юзером в избранное
 * (В users данного рецепта есть id текущего юзера)
 *
 * GET recipes/favorite/:id
 *
 * Вернет объект рецепта(статус 200)
 * или { message: "Not Found" }(статус 404)
 */
router.get('/favorite/:id', isValidId, ctrl.getFavoriteById);

/**
 *
 *******************************************************
 * Добавляет/удаляет рецепт с заданным id в избранное
 * (Добавит id текущего юзера в массив  users рецепта с заданным id,
 * если его там нет. Иначе, если он там уже есть - удалит его)
 *
 * PATCH recipes/favorite/:id
 *
 * Вернет
 * { favorite: true }(статус 200) - рецепт был добавлен в избранные
 * { favorite: false }(статус 200) - рецепт был удален из избранных
 * { message: "Not Found" }(статус 404) - рецепт с таким id в избранных не найден
 */
router.patch('/favorite/:id', isValidId, ctrl.updateFavoriteById);

/**
 *
 *******************************************************
 * Список всех рецептов, которые добавил текущий юзер
 * (Рецепты, в поле owner которых стоит id текущего юзера)
 * Возможна фильтрация по тем же полям, что и для recipes/search
 * (см. пример для recipes/popular)
 *
 * GET recipes/own?[фильтры...]
 *
 *  Вернет объект, где hits - массив ингредиентов
 * { page, limit, totalHits, hits }
 */
router.get('/own', ctrl.getOwnAll);

/**
 *
 *******************************************************
 * Рецепт по id, добавленный текущим юзером
 *
 *  GET recipes/own/:id
 *
 * Вернет объект рецепта(статус 200)
 * или { message: "Not Found" }(статус 404)
 */
router.get('/own/:id', isValidId, ctrl.getOwnById);

/**
 *
 *******************************************************
 * Удаляет рецепт по id, добавленный текущим юзером
 * (в поле owner рецепта должен стоять id текущего юзера)
 *
 *  DELETE recipes/own/:id
 *
 * Вернет { message: 'Successfully' }(статус 200)
 * или { message: "Not Found" }(статус 404)
 */
router.delete('/own/:id', isValidId, ctrl.removeOwnById);

/**
 *
 *******************************************************
 * Рецепт по id
 *
 *  GET recipes/:id
 *
 * Вернет объект рецепта(статус 200)
 * или { message: "Not Found" }(статус 404)
 */
router.get('/:id', isValidId, ctrl.getById);

export default router;
