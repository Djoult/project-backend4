import fs from 'fs/promises';
import { CLOUDINARY_THUMB_DIR } from '../constants/index.js';
import { cloudinary } from '../helpers/index.js';

const { uploader } = cloudinary;

export const removeDrinkThumbOnError = async req => {
  const {
    file,
    body: { drinkThumb },
  } = req;

  if (file) {
    try {
      // траим на случай если файл был удален в processDrinkThumb
      await fs.unlink(file.newPath || file.path);
    } catch {}
  }

  // удаляем ассоциированную картинку из cloudinary
  if (drinkThumb) {
    const [, thumbId] = drinkThumb.match(/([^\/]+)\.[^\.]+$/);
    await uploader.destroy(`${CLOUDINARY_THUMB_DIR}/${thumbId}`);
  }
};
