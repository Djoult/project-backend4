import { HttpError, regex, normalizeStr } from '../../helpers/index.js';
import { HTTP_STATUS, DEF_PAGE, DEF_LIMIT } from '../../constants/index.js';
import { Ingredient } from '../../models/index.js';

export const getIngredientList = async ({ query }, res) => {
  let { page, limit, title } = query;

  page = parseInt(page) || DEF_PAGE;
  limit = parseInt(limit) || DEF_LIMIT;

  [title] = normalizeStr(title);
  const filter = title && { title: regex(title) };

  res.json(
    await Ingredient.find({ ...filter }, '', {
      limit,
      skip: (page - 1) * limit,
    })
  );
};
