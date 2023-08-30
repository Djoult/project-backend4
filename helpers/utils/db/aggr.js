import { isArray, normalizeStr } from '../index.js';

import {
  unwind,
  mergeObj,
  concat,
  literal,
  removeFields,
  regexMatch,
} from './aggrHelpers.js';

const DEF_SAMPLE_COUNT = 3;

/**
 *
 * Конвеер для подтягивания деталей рецепта
 * по имени из коллекции ingredients в recipes
 *
 * NOTE: чтобы ускорить - создать индекс
 * для title ингредиента в коллекции ingredients
 */
const lookupIngredients = () => {
  return [
    unwind('$ingredients'),
    {
      // ищем (без учета регистра) в ingredients
      // информацию по полю title
      $lookup: {
        from: 'ingredients',
        let: {
          regex: concat('^', '$ingredients.title', literal`$`),
        },
        pipeline: [regexMatch('$title', '$$regex')],
        as: 'ingredients_details',
      },
    },
    unwind('$ingredients_details'),
    {
      // формируем выборку и удаляем лишние поля
      $group: {
        _id: '$_id',
        data: { $first: '$$ROOT' },
        ingredients: {
          // мержим { title, ingredientThumb, ...}
          // и { title, measure } ради поля measure
          $push: mergeObj('$ingredients_details', '$ingredients'),
        },
      },
    },
    { $addFields: { 'data.ingredients': '$ingredients' } },
    { $replaceRoot: { newRoot: '$data' } },
    removeFields('ingredients_details' /* 'ingredients._id' */),
  ];
};

/**
 *
 * Конвеер для выборки заданного кол-ва случайных рецептов
 * заданной категории
 *
 * @param {*} category - список категорий
 * @param {number} sampleCount - кол-во случайно выбранных
 *    документов заданной категорий
 * @returns {array} - конвеер для агрегации
 */
const groupRecipesByCategory = (category, sampleCount) => {
  return [
    ...getCategorySamples(category, sampleCount),
    ...lookupIngredients(),
    ...groupByCategory(),
  ];
};

export const recipeAggregationStages = {
  lookupIngredients,
  groupRecipesByCategory,
};

//
// helpers
//

const getCategorySamples = (categoryList, sampleCount) => {
  sampleCount = parseInt(sampleCount) || DEF_SAMPLE_COUNT;
  const list = isArray(categoryList) ? categoryList : [categoryList];

  // формируем $facet
  const facetValue = list.reduce((res, categoryName, idx) => {
    res[idx] = [
      {
        $match: {
          category: { $regex: RegExp(normalizeStr(categoryName), 'i') },
          drinkThumb: { $ne: null },
        },
      },
      { $sample: { size: Number(sampleCount) } },
    ];
    return res;
  }, {});

  // ['$1', '$2', ...]
  const facetKeyList = Object.keys(facetValue).map(k => `$${k}`);

  return [
    { $facet: { ...facetValue } },
    { $project: { result: { $concatArrays: [...facetKeyList] } } },
    unwind('$result'),
    { $replaceRoot: { newRoot: '$result' } },
  ];
};

const groupByCategory = () => {
  return [
    {
      $group: {
        _id: { $toLower: '$category' },
        recipes: {
          $push: '$$ROOT',
        },
      },
    },
    {
      $project: {
        category: '$_id',
        recipes: '$recipes',
        _id: 0,
      },
    },
  ];
};
