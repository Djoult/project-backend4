import { HTTP_STATUS, DEF_LIMIT, DEF_PAGE } from '../../constants/index.js';
import { Recipe } from '../../models/index.js';

import {
  isInt,
  regex,
  HttpError,
  normalizeStr,
  isEmptyObj as isEmpty,
  getRecipeIngredientsAggrPipeline,
} from '../../helpers/index.js';

export const getMainPageRecipes = async ({ query }, res) => {
  let { category } = query;

  // базовый конвеер
  const pipeline = getRecipeIngredientsAggrPipeline();

  const filter = { ...regex(category, 'category') };

  if (!isEmpty(filter)) {
    pipeline.unshift({ $match: { ...filter } });
  }

  const result = await Recipe.aggregate(pipeline);

  res.json(result);
};
