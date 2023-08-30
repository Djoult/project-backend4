import { HTTP_STATUS } from '../../constants/index.js';
import { Recipe } from '../../models/index.js';

import {
  recipeAggregationStages,
  parseRequestQuery,
  normalizeStr,
} from '../../helpers/index.js';

export const getMainPageRecipes = async ({ query }, res) => {
  let { category, samples, thumb, instructions } = parseRequestQuery(query);
  [thumb, instructions] = normalizeStr(thumb, instructions);

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
