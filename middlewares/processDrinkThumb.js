import 'dotenv/config';
import path from 'path';
import fs from 'fs/promises';

import {
  HTTP_STATUS,
  JIMP_SUPPORTED_EXTNAMES,
  CLOUDINARY_THUMB_DIR,
} from '../constants/index.js';

import {
  bitmap,
  checkFileExists,
  cloudinary,
  HttpError,
  uuid,
} from '../helpers/index.js';

const { uploader } = cloudinary;
const bitmapOpts = {
  width: 1200,
  height: 1200,
  jpeg: 70,
  cover: true,
};

export const processDrinkThumb = async (req, res, next) => {
  const { body, file = '' } = req;

  // проверяем наличие файла
  if (file) checkFileExists(file.path);

  try {
    // трансформируем и заодно проверяем не битая ли картинка
    // Если расширение изменилось, запоминаем новый путь
    file.newPath = await bitmap.process(file.path, bitmapOpts);
  } catch {
    throw HttpError(
      HTTP_STATUS.unprocContent,
      `${file.fieldname}: possible broken bitmap`
    );
  }

  // перемещаем файл в облачное хранилище,
  // в ка-ве publicId используем путь к файлу
  const { secure_url } = await uploader.upload(file.newPath, {
    folder: CLOUDINARY_THUMB_DIR,
    use_filename: true,
  });

  // удаляем временный файл
  await fs.unlink(file.newPath);

  // передаем ссылку на сохраненный файл транзитом дальше
  body.drinkThumb = secure_url;

  next();
};
