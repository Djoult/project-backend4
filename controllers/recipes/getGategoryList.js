import { categoryList } from '../../constants/index.js';
import { HttpError } from '../../helpers/index.js';
import { HTTP_STATUS } from '../../constants/index.js';

export const getCategoryList = async (req, res) => {
  res.json(categoryList);
};
