import path from 'path';
import fs from 'fs/promises';
import Jimp from 'jimp';
import { isNum } from './misc.js';
import { JIMP_SUPPORTED_EXTNAMES } from '../../constants/index.js';

/**
 *
 * @param {string} filePath - файл изображения
 * @param {object} options -
 *  - jpeg - если задано валидное значение (0-100),
 *    сохраняет изображение в формате jpeg с расширением .jpg
 *  - removeOriginal - если true, удаляет оригинальное изображение в случае,
 *    если его имя не совпадает с обработанным (например, был tif - сохранили в jpg)
 *  - cover - если true, масштабирует с сохранением пропорций, обрезая лишнее
 *
 * @returns {string} - полное имя к сохраненному изображению
 */
const resize = async (
  filePath,
  { width: w, height: h, jpeg: qual, cover, removeOriginal } = {}
) => {
  const img = await Jimp.read(filePath);

  const saveAsJpeg = qual >= 0 || qual <= 100;

  const newFilePath =
    saveAsJpeg && !img._originalMime.endsWith('jpeg')
      ? filePath.replace(/(?<=\.)\w{3,4}$/, 'jpg')
      : filePath;

  // трансформируем битмап
  if (isNum(w) && isNum(h)) {
    cover ? img.cover(w, h) : img.resize(w, h);
  }
  saveAsJpeg && img.quality(qual);

  // сохраняем битмап в файл
  await img.writeAsync(newFilePath);

  // удаляем оригинал, если filePath и newFilePath не совпадают
  // Иначе, просто перезаписываем исходный файл
  if (removeOriginal && newFilePath !== filePath) {
    await fs.unlink(filePath);
  }

  return newFilePath;
};

const checkFileFormat = async filePath => {
  const extname = path.extname(filePath).toLowerCase().slice(1);
  if (!JIMP_SUPPORTED_EXTNAMES.includes(extname))
    throw Error('Unsupported format');
};

export const bitmap = {
  resize,
  checkFileFormat,
};
