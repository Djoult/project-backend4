import { ctrlWrapper } from '../../decorators/index.js';
import { getGlassList } from './getGlassList.js';
import { getIngredientList } from './getIngredientList.js';

export const ctrl = {
  getGlassList: ctrlWrapper(getGlassList),
  getIngredientList: ctrlWrapper(getIngredientList),
};
