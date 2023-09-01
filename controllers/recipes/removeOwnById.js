import { HTTP_STATUS } from '../../constants/index.js';
import { Recipe } from '../../models/index.js';
import { HttpError, db } from '../../helpers/index.js';

export const removeOwnById = async ({ params: { id }, user }, res) => {
  const { _id: owner } = user;

  const result = await Recipe.findOneAndRemove({
    _id: db.makeObjectId(id),
    owner,
  });

  if (!result) throw HttpError(HTTP_STATUS.notFound);
  res.json({ message: 'Successfully' });
};
