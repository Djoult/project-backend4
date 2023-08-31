import { HTTP_STATUS, categoryList } from '../../constants/index.js';
import { Recipe } from '../../models/index.js';

import {
  recipeAggregationStages,
  parseRequestQuery,
  normalizeStr,
  isInt,
  isPositiveInt,
  getRandomElements,
} from '../../helpers/index.js';

export const getMainPageRecipes = async ({ query }, res) => {
  let { category, samples, thumb, instructions, categoryCount } =
    parseRequestQuery(query);
  [thumb, instructions] = normalizeStr(thumb, instructions);

  // если задан &categoryCount и &category=.., игнорим последний
  if (isPositiveInt(categoryCount)) {
    category = getRandomElements(categoryList, categoryCount);
  }

  thumb =
    (thumb === 'true' && { drinkThumb: { $ne: null } }) ||
    (thumb === 'false' && { drinkThumb: null }) ||
    null;

  instructions =
    (instructions === 'true' && { instructions: { $ne: null } }) ||
    (instructions === 'false' && { instructions: null }) ||
    null;

  const extraFilter = {
    ...instructions,
    ...thumb,
  };

  const pipeline = recipeAggregationStages.groupRecipesByCategory(
    category,
    samples,
    extraFilter
  );

  const result = await Recipe.aggregate(pipeline);
  // если result[0].category === "" -
  // для заданных параметров результатов нет
  const [{ category: cat }] = result;
  res.json(cat ? result : []);
};
