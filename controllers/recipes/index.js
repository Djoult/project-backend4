import { ctrlWrapper } from '../../decorators/index.js';
import { add } from './add.js';
import { getById } from './getById.js';
import { getCategoryList } from './getGategoryList.js';
import { getIngredientList } from './getIngredientList.js';
import { getMainPageRecipes } from './getMainPageRecipes.js';
import { search } from './search.js';
import { getFavoriteAll } from './getFavoriteAll.js';
import { getOwnAll } from './getOwnAll.js';
import { getOwnById } from './getOwnById.js';
import { getFavoriteById } from './getFavoriteById.js';
import { getPopularAll } from './getPopularAll.js';
import { updateFavoriteById } from './updateFavoriteById.js';
import { removeOwnById } from './removeOwnById.js';

export const ctrl = {
  add: ctrlWrapper(add),
  getById: ctrlWrapper(getById),
  getCategoryList: ctrlWrapper(getCategoryList),
  search: ctrlWrapper(search),
  getIngredientList: ctrlWrapper(getIngredientList),
  getMainPageRecipes: ctrlWrapper(getMainPageRecipes),
  getFavoriteAll: ctrlWrapper(getFavoriteAll),
  getFavoriteById: ctrlWrapper(getFavoriteById),
  getOwnAll: ctrlWrapper(getOwnAll),
  getOwnById: ctrlWrapper(getOwnById),
  getPopularAll: ctrlWrapper(getPopularAll),
  removeOwnById: ctrlWrapper(removeOwnById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
};
