import { HttpError, regex, normalizeStr } from '../../helpers/index.js';
import { HTTP_STATUS, DEF_PAGE, DEF_LIMIT } from '../../constants/index.js';
import { Ingredient } from '../../models/index.js';

const SORT_ORDER = {
  asc: 1,
  desc: -1,
};

/**
 * tile должен быть частью имени искомого ингредиента (case-insensitive)
 * - recipes/ingredient-list?
 *      title=..&
 *      page=..&
 *      limit=..&
 *      sort={asc|desc}
 */
export const getIngredientList = async ({ query }, res) => {
  let { page, limit, title, sort } = query;

  page = parseInt(page) || DEF_PAGE;
  limit = parseInt(limit) || DEF_LIMIT;
  sort = normalizeStr(sort);
  const filter = title && { title: regex(title) };

  // общее кол-во документов, соотвествующих фильтру
  const totalHits = await Ingredient.countDocuments({ ...filter });

  const hits = await Ingredient.find({ ...filter }, '', {
    limit,
    skip: (page - 1) * limit,
  }).sort({
    title: SORT_ORDER[sort] ?? SORT_ORDER['asc'],
  });

  res.json({
    page,
    limit,
    totalHits,
    hits,
  });
};
