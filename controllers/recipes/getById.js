import { HttpError } from '../../helpers/index.js';
import { HTTP_STATUS } from '../../constants/index.js';
import { Recipe } from '../../models/index.js';

export const getById = async ({ params: { id } }, res) => {
  const result = await Recipe.findById(id).populate('ingredients.ingredientId');
  if (!result) throw HttpError(HTTP_STATUS.notFound);

  res.json(result);
};
