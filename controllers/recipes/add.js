import { HTTP_STATUS } from '../../constants/index.js';
import { HttpError } from '../../helpers/index.js';
import { Recipe } from '../../models/index.js';

export const add = async ({ body, user }, res) => {
  const { _id: owner } = user;

  console.log(body);

  // TODO: lookup для созданного объекта
  const result = await Recipe.create({ ...body, owner });

  res.status(HTTP_STATUS.created).json(result);
};
