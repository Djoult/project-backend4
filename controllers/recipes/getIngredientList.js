import { Ingredient } from '../../models/index.js';

import {
  HTTP_STATUS,
  DEF_PAGE,
  DEF_LIMIT,
  MAX_LIMIT,
} from '../../constants/index.js';

import {
  HttpError,
  regex,
  normalizeStr,
  fitIntoRange,
} from '../../helpers/index.js';

const SORT_ORDER = {
  asc: 1,
  desc: -1,
};

/**
 *
 *  - recipes/ingredient-list?
 *      title=..&
 *      page=..&
 *      limit=..&
 *      sort={asc|desc}
 */
export const getIngredientList = async ({ query }, res) => {
  let { page, limit, title, sort } = query;

  sort = normalizeStr(sort);
  page = parseInt(page) || DEF_PAGE;
  limit = fitIntoRange(limit, 0, MAX_LIMIT, DEF_LIMIT);

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
