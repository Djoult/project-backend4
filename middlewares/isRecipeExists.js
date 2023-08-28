import { HttpError, regex, normalizeStr } from '../helpers/index.js';
import { HTTP_STATUS } from '../constants/index.js';
import { Recipe } from '../models/index.js';

const ERR_ALREADY_EXISTS = 'A recipe with same title is already in your list';

export const isRecipeExists = async ({ body, user }, res, next) => {
  const { _id: owner } = user;
  [drink] = normalizeStr(body.drink);

  const found = await Recipe.findOne({
    owner,
    drink: regex(drink, true),
  });

  if (found) throw HttpError(HTTP_STATUS.conflict, ERR_ALREADY_EXISTS);

  next();
};
