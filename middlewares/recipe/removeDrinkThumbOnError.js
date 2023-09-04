import fs from 'fs/promises';
import { CLOUDINARY_THUMBS_DRINK_DIR } from '../../constants/index.js';
import { cloud } from '../../helpers/index.js';

export const removeDrinkThumbOnError = async ({ file, body }) => {
  const { drinkThumb } = body;

  // удаляем картинку из tmp
  // траим на случай если файл уже был удален в processDrinkThumb
  if (file) {
    try {
      await fs.unlink(file.newPath || file.path);
    } catch {}
  }

  // удаляем ассоциированную картинку из cloudinary
  if (drinkThumb) await cloud.destroy(drinkThumb);
};