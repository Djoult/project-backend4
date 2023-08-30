import { HTTP_STATUS, DEF_LIMIT, DEF_PAGE } from '../../constants/index.js';
import { Recipe } from '../../models/index.js';

import {
  db,
  isStr,
  regex,
  normalizeStr,
  isEmptyObj as isEmpty,
  recipeAggregationStages,
  parseSortQueryParam,
  parseRequestQuery,
  isNonEmptyArray,
} from '../../helpers/index.js';

/**
 *
 * - recipes/search?
 *      drink={..}&
 *      category={..}&
 *      ingredient={..}&
 *      glass={..}&
 *      own=[true|false]&
 *      favorite=[true|false]&
 *      thumb=[true|false]&
 *      instructions=[true|false]
 *      sort=fieldName:[asc|desc]
 */
export const search = async ({ user, query }, res) => {
  let {
    page,
    limit,
    drink,
    category,
    ingredient,
    instructions,
    own,
    favorite,
    sort,
    glass,
    thumb,
  } = parseRequestQuery(query);

  // !!! TODO: убрать при нормальной авторизации
  const { _id: owner } = user ?? {
    _id: db.makeObjectId('64ece50c9fceb55e2b121336'),
  };

  const { lookupIngredients } = recipeAggregationStages;
  const pipeline = [...lookupIngredients()];

  //
  // пагинация
  //

  page = parseInt(page) || DEF_PAGE;
  limit = parseInt(limit) || DEF_LIMIT;
  pipeline.unshift({ $limit: limit }, { $skip: (page - 1) * limit });

  //
  // сортировка в конец (после lookup)
  // TODO: можно добавить сортировку по нескольким
  //

  let { fieldName: sortFieldName, order } = parseSortQueryParam(sort);
  if (sortFieldName) {
    if (sortFieldName === 'popularity') sortFieldName = 'users';
    pipeline.push({ $sort: { [sortFieldName]: order } });
  }

  //
  // фильтрация (в начало конвеера)
  //

  [favorite, own, thumb, instructions] = normalizeStr(
    favorite,
    own,
    thumb,
    instructions
  );

  own =
    (own === 'true' && { owner }) ||
    (own === 'false' && { owner: { $ne: owner } }) ||
    null;

  favorite =
    (favorite === 'true' && { users: { $in: [owner] } }) ||
    (favorite === 'false' && { users: { $nin: [owner] } }) ||
    null;

  thumb =
    (thumb === 'true' && { drinkThumb: { $ne: null } }) ||
    (thumb === 'false' && { drinkThumb: null }) ||
    null;

  instructions =
    (instructions === 'true' && { instructions: { $ne: null } }) ||
    (instructions === 'false' && { instructions: null }) ||
    null;

  let filter = {
    ...regex(drink, 'drink'),
    ...regex(category, 'category'),
    ...regex(ingredient, 'ingredients.title'),
    ...regex(glass, 'glass'),
    ...(owner && own),
    ...(owner && favorite),
    ...instructions,
    ...thumb,
  };

  if (sortFieldName) {
    // если указано поле для сортировки, делаем выборку только тех,
    // у кого есть такое поле (например, users только у новых рецептов)
    // Без $and, если в фильтре есть поле с именем как у сортируемого -
    // его значение будет переписано значением { $exists: true }
    filter = { $and: [filter, { [sortFieldName]: { $exists: true } }] };
  }

  if (!isEmpty(filter)) {
    pipeline.unshift({ $match: { ...filter } });
  }

  // общее кол-во документов, соотвествующих фильтру
  const totalHits = await Recipe.countDocuments({ ...filter });
  const hits = await Recipe.aggregate(pipeline);

  res.json({
    page,
    limit,
    totalHits,
    hits,
  });
};
