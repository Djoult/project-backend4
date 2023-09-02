import { HTTP_STATUS, categoryList } from '../../constants/index.js';
import { Recipe } from '../../models/index.js';

import {
  recipeAggregationStages,
  parseRequestQuery,
  normalizeStr,
  isInt,
  isPositiveInt,
  isEmptyObj,
  getRandomElements,
} from '../../helpers/index.js';

export const getMainPageRecipes = async ({ query }, res) => {
  let { category, thumb, instructions, samples, categoryCount } =
    parseRequestQuery(query);

  // по умолчанию берем 3 случайных рецепта с картинкой
  // из 4-х случайных категорий
  if (isEmptyObj(query)) {
    categoryCount = 4;
    samples = 3;
    thumb = 'true';
  }

  [thumb, instructions] = normalizeStr(thumb, instructions);

  // если задан &categoryCount и &category=.., игнорим последний
  if (isPositiveInt(categoryCount)) {
    category = getRandomElements(categoryList, categoryCount);
  }

  thumb =
    (thumb === 'true' && { drinkThumb: { $nin: [null, ''] } }) ||
    (thumb === 'false' && { drinkThumb: { $in: [null, ''] } }) ||
    null;

  instructions =
    (instructions === 'true' && { instructions: { $nin: [null, ''] } }) ||
    (instructions === 'false' && { instructions: { $in: [null, ''] } }) ||
    null;

  const pipeline = recipeAggregationStages.groupRecipesByCategory(
    category,
    samples,
    {
      ...instructions,
      ...thumb,
    }
  );

  const result = await Recipe.aggregate(pipeline);
  // если result[0].category === "" -
  // для заданных параметров результатов нет
  const [{ category: cat }] = result;
  res.json(cat ? result : []);
};
