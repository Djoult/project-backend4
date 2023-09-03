import {
  HTTP_STATUS,
  CLOUDINARY_THUMBS_DRINK_DIR,
} from '../../constants/index.js';
import { Recipe } from '../../models/index.js';
import { HttpError, db, cloud } from '../../helpers/index.js';
import chalk from 'chalk';

export const removeOwnById = async ({ params: { id }, user }, res) => {
  let thumbDeletionResult;
  const { _id: owner } = user;

  const result = await Recipe.findOneAndRemove({
    _id: db.makeObjectId(id),
    owner,
  });

  if (!result) throw HttpError(HTTP_STATUS.notFound);

  // удаляем ассоциированную картинку из cloudinary
  const { drinkThumb } = result;
  if (drinkThumb) thumbDeletionResult = await cloud.destroy(drinkThumb);

  res.json({
    message: 'Successfully',
    thumbRemoved: thumbDeletionResult?.result,
  });
};
