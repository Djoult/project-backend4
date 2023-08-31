import { HTTP_STATUS } from '../../constants/index.js';
import { Recipe } from '../../models/index.js';
import { HttpError } from '../../helpers/index.js';

export const removeOwnById = async ({ params: { id }, user }, res) => {
  const { _id: owner } = user ?? '';

  const result = await Recipe.findByIdAndRemove(id, { owner });
  if (!result) throw HttpError(HTTP_STATUS.notFound);
  res.json(result);
};
