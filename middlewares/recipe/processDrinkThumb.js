import 'dotenv/config';
import path from 'path';
import fs from 'fs/promises';

import {
  HTTP_STATUS,
  JIMP_SUPPORTED_EXTNAMES,
  CLOUDINARY_THUMBS_DRINK_DIR,
} from '../../constants/index.js';

import {
  bitmap,
  checkFileExists,
  cloud,
  HttpError,
} from '../../helpers/index.js';

const ERR_BAD_BITMAP = fieldname => `${fieldname}: possible broken bitmap`;

const bitmapOpts = {
  width: 1200,
  height: 1200,
  jpeg: 70,
  cover: true,
};

export const processDrinkThumb = async ({ body, file }, res, next) => {
  // проверяем наличие файла
  if (file) checkFileExists(file.path);

  try {
    // трансформируем и заодно проверяем не битая ли картинка
    // Если расширение изменилось, запоминаем новый путь
    file.newPath = await bitmap.process(file.path, bitmapOpts);
  } catch {
    throw HttpError(HTTP_STATUS.unprocContent, ERR_BAD_BITMAP(file.fieldname));
  }

  // перемещаем файл в облачное хранилище
  // передаем ссылку на сохраненный файл транзитом дальше
  body.drinkThumb = await cloud.upload(
    file.newPath,
    CLOUDINARY_THUMBS_DRINK_DIR
  );

  // удаляем временный файл
  await fs.unlink(file.newPath);

  next();
};
