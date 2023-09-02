import { HTTP_STATUS, CLOUDINARY_THUMB_DIR } from '../../constants/index.js';
import { Recipe } from '../../models/index.js';
import { HttpError, db, cloudinary } from '../../helpers/index.js';
import chalk from 'chalk';

const { uploader } = cloudinary;

export const removeOwnById = async ({ params: { id }, user }, res) => {
  let thumbDeletionResult;
  const { _id: owner } = user;

  const result = await Recipe.findOneAndRemove({
    _id: db.makeObjectId(id),
    owner,
  });

  if (!result) throw HttpError(HTTP_STATUS.notFound);
  const { drinkThumb } = result;

  // удаляем ассоциированную картинку из cloudinary
  if (drinkThumb) {
    const [, thumbId] = drinkThumb.match(/([^\/]+)\.[^\.]+$/);
    thumbDeletionResult = await uploader.destroy(
      `${CLOUDINARY_THUMB_DIR}/${thumbId}`
    );
  }

  res.json({
    message: 'Successfully',
    thumbRemoved: thumbDeletionResult.result,
  });
};
