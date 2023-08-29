import { ctrlWrapper } from '../../decorators/index.js';
import { add } from './add.js';
import { getById } from './getById.js';
import { getCategoryList } from './getGategoryList.js';
import { getIngredientList } from './getIngredientList.js';
import { getMainPageRecipes } from './getMainPageRecipes.js';
import { search } from './search.js';

export const ctrl = {
  add: ctrlWrapper(add),
  getById: ctrlWrapper(getById),
  getCategoryList: ctrlWrapper(getCategoryList),
  search: ctrlWrapper(search),
  getIngredientList: ctrlWrapper(getIngredientList),
  getMainPageRecipes: ctrlWrapper(getMainPageRecipes),
};
