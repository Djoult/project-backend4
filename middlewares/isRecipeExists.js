import { HttpError, regex, normalizeStr } from '../helpers/index.js';
import { HTTP_STATUS } from '../constants/index.js';
import { Recipe } from '../models/index.js';
import { ctrlWrapper } from '../decorators/ctrlWrapper.js';

const ERR_ALREADY_EXISTS = 'A recipe with same title is already in your list';

export const isRecipeExists = async ({ body, user }, res, next) => {
  //const { _id: owner } = user;
  const { drink } = body;

  const found = await Recipe.findOne({
    //owner,
    drink: regex(drink, '', true),
  });

  if (found)
    throw HttpError(HTTP_STATUS.conflict, `"${drink}": ${ERR_ALREADY_EXISTS}`);

  next();
};
