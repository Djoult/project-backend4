import { HTTP_STATUS } from '../../constants/index.js';
import { Recipe } from '../../models/index.js';
import { HttpError, db } from '../../helpers/index.js';

export const updateFavoriteById = async ({ params: { id }, user }, res) => {
  // db.makeObjectId('64ed3efd7cac80d8e7730620')
  const { _id: owner } = user ?? '';

  const { length: isFavorite } = await Recipe.find({
    _id: db.makeObjectId(id),
    users: { $in: [owner] },
  });

  const result = await Recipe.findByIdAndUpdate(
    id,
    { [isFavorite ? `$pull` : `$addToSet`]: { users: owner } },
    { new: true }
  );

  if (!result) throw HttpError(HTTP_STATUS.notFound);
  res.json(result);
};
