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

export const getMainPageRecipes = async ({ query }, res) => {
  let { categories } = query;

  [categories] = normalizeStr(categories);
};
