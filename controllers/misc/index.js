import { ctrlWrapper } from '../../decorators/index.js';
import { getGlassList } from './getGlassList.js';

export const ctrl = {
  getGlassList: ctrlWrapper(getGlassList),
};
