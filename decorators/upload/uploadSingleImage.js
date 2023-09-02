import { uploadImage, MAX_FILE_SIZE } from './index.js';
import { HTTP_STATUS } from '../../constants/index.js';
import { HttpError } from '../../helpers/index.js';

export const uploadSingleImage = fieldName => {
  return (req, res, next) => {
    const handler = uploadImage.single(fieldName);
    const message = `${fieldName}: max file size limit: ${MAX_FILE_SIZE}`;

    // вызываем handler с кастомной обработкой ошибок
    handler(req, res, err => {
      if (err?.name === 'MulterError' && err.code === 'LIMIT_FILE_SIZE') {
        return next(HttpError(HTTP_STATUS.contentTooLarge, message));
      }
      next(err);
    });
  };
};
