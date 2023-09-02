import fs from 'fs/promises';
import { CLOUDINARY_THUMBS_DRINK_DIR } from '../constants/index.js';
import { cloud } from '../helpers/index.js';

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
  if (drinkThumb) await cloud.destroy(drinkThumb);
};
