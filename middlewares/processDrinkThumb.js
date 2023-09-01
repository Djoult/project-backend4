import 'dotenv/config';
import path from 'path';
import { HTTP_STATUS } from '../constants/http.js';
import { isFileExists, bitmap } from '../helpers/index.js';

const { TEMP_DIR } = process.env;

export const processDrinkThumb = async (req, res, next) => {
  const { file = '' } = req;

  if (!(await isFileExists(file.path))) return next();
  await bitmap.checkFileFormat(file.path);

  try {
    //  конвертим в jpeg, заодно проверяя не битый ли битмап
    // Если расширение изменилось, запоминаем новый путь
    file.newPath = await bitmap.resize({ jpeg: 70 });
  } catch {
    throw HttpError(
      HTTP_STATUS.unprocContent,
      `${file.fieldname}: possible broken bitmap`
    );
  }

  // перемещаем файл в облачное хранилище

  next();
};
