import { HTTP_STATUS, DEF_LIMIT, DEF_PAGE } from '../../constants/index.js';
import { Recipe } from '../../models/index.js';

import {
  isInt,
  regex,
  HttpError,
  normalizeStr,
  isEmptyObj as isEmpty,
  getRecipeIngredientsAggrPipeline as pipeline,
} from '../../helpers/index.js';

/**
 *
 * Поиск по названию напитка, по категории и по ингредиенту
 * - recipes/search?drink={..}&category={..}&ingredient={..}
 */
export const search = async ({ query }, res) => {
  let { page, limit, drink, category, ingredient } = query;

  [drink, category, ingredient] = normalizeStr(drink, category, ingredient);
  page = parseInt(page) || DEF_PAGE;
  limit = parseInt(limit) || DEF_LIMIT;

  const filter = {
    ...(drink && { drink: regex(drink) }),
    ...(category && { category: regex(category) }),
    ...(ingredient && { 'ingredients.title': regex(ingredient) }),
  };

  const result = await Recipe.aggregate([
    !isEmpty(filter) && { $match: { ...filter } },
    { $limit: limit },
    { $skip: (page - 1) * limit },
    ...pipeline(),
  ]);

  res.json(result);
};
