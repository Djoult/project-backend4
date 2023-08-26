import { ctrlWrapper } from '../../decorators/index.js';
import { add } from './add.js';
import { getById } from './getById.js';

export const ctrl = {
  add: ctrlWrapper(add),
  getById: ctrlWrapper(getById),
};
