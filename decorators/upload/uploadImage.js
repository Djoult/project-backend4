import 'dotenv/config';
import multer from 'multer';
import path from 'path';
import { HttpError, uuid } from '../../helpers/index.js';

import {
  HTTP_STATUS,
  JIMP_SUPPORTED_FORMATS,
  JIMP_SUPPORTED_MIMETYPES,
} from '../../constants/index.js';

const { TEMP_DIR = 'tmp' } = process.env;

const destination = path.resolve(TEMP_DIR);
export const MAX_FILE_SIZE = 1024 ** 2 * 5; // 5Mb
const SUPPORTED_FORMATS = JIMP_SUPPORTED_FORMATS.join(', ');
const isImageType = mimeType => JIMP_SUPPORTED_MIMETYPES.includes(mimeType);

//
// опции Multer
//

// даем случайное имя фиксированной длинны (UUID v4)
const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    // добавим расширение к информации о файле
    file.extname = path.extname(file.originalname);
    cb(null, `${uuid()}${file.extname}`);
  },
});

// лимит на размер файла
const limits = {
  fileSize: MAX_FILE_SIZE,
};

// фильтруем по mimetype
const fileFilter = async (req, file, cb) => {
  const { fieldname, mimetype } = file;

  if (!isImageType(mimetype)) {
    return cb(
      HttpError(
        HTTP_STATUS.unprocContent,
        `${fieldname}: supported formats: ${SUPPORTED_FORMATS}`
      )
    );
  }
  cb(null, true);
};

//
// интерфейс методов генерации middleware
//

export const uploadImage = multer({
  storage,
  limits,
  fileFilter,
});
