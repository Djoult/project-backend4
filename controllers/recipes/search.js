import { Recipe } from '../../models/index.js';

import {
  HTTP_STATUS,
  DEF_LIMIT,
  DEF_PAGE,
  MAX_LIMIT,
} from '../../constants/index.js';

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
  fitIntoRange,
  isPositiveInt,
} from '../../helpers/index.js';

export const search = async ({ user, query }, res) => {
  const { _id: owner } = user;

  let {
    page,
    limit,
    drink,
    category,
    ingredient,
    instructions,
    samples,
    own,
    favorite,
    sort,
    glass,
    thumb,
    video,
  } = parseRequestQuery(query);

  const { lookupIngredients } = recipeAggregationStages;
  const pipeline = [...lookupIngredients()];

  page = parseInt(page) || DEF_PAGE;
  limit = fitIntoRange(limit, 0, MAX_LIMIT, DEF_LIMIT);
  pipeline.unshift({ $limit: limit }, { $skip: (page - 1) * limit });

  // сортировка в конец (после lookup)
  // TODO: можно добавить сортировку по нескольким
  let { fieldName: sortFieldName, order } = parseSortQueryParam(sort);
  if (sortFieldName) {
    if (sortFieldName === 'popularity') sortFieldName = 'users';
    pipeline.push({ $sort: { [sortFieldName]: order } });
  }

  [favorite, own, thumb, instructions, video] = normalizeStr(
    favorite,
    own,
    thumb,
    instructions,
    video
  );

  own =
    (own === 'true' && { owner }) ||
    (own === 'false' && { owner: { $ne: owner } });

  favorite =
    (favorite === 'true' && { users: { $in: [owner] } }) ||
    (favorite === 'false' && { users: { $nin: [owner] } });

  thumb =
    (thumb === 'true' && { drinkThumb: { $nin: [null, ''] } }) ||
    (thumb === 'false' && { drinkThumb: { $in: [null, ''] } }) ||
    null;

  video =
    (video === 'true' && { video: { $nin: [null, ''] } }) ||
    (video === 'false' && { video: { $in: [null, ''] } }) ||
    null;

  instructions =
    (instructions === 'true' && { instructions: { $nin: [null, ''] } }) ||
    (instructions === 'false' && { instructions: { $in: [null, ''] } }) ||
    null;

  let filter = {
    ...regex(drink, 'drink'),
    ...regex(category, 'category'),
    ...regex(ingredient, 'ingredients.title'),
    ...regex(glass, 'glass'),
    ...own,
    ...favorite,
    ...instructions,
    ...thumb,
    ...video,
  };

  // кол-во рандомных, ставим после фильтра
  // Иначе, найдет, например, 3 рандомных без видео
  // И если задан фильтр search?video - запрос не сработает как надо
  if (isPositiveInt(samples)) {
    pipeline.unshift({ $sample: { size: Number(samples) } });
  }

  if (sortFieldName) {
    // если указано поле для сортировки, делаем выборку только тех,
    // у кого есть такое поле (например, users только у новых рецептов)
    // Без $and, если в фильтре есть поле с именем как у сортируемого -
    // его значение будет переписано значением { $exists: ... }
    filter = { $and: [filter, { [sortFieldName]: { $exists: true } }] };
  }

  // фильтрация (в начало конвеера)
  if (!isEmpty(filter)) {
    pipeline.unshift({ $match: { ...filter } });
  }

  // общее кол-во документов, соотвествующих фильтру
  // TODO: лучше сделать в самом конвеере
  const totalHits = await Recipe.countDocuments({ ...filter });
  const hits = await Recipe.aggregate(pipeline);

  res.json({
    totalHits: Math.min(totalHits, samples) || totalHits,
    page,
    limit,
    hits,
  });
};
