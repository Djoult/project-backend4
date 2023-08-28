import {
  unwind,
  mergeObj,
  concat,
  literal,
  removeFields,
  regexMatch,
} from './aggrHelpers.js';

/**
 *
 * Конвеер для агрегации recipes и деталей рецепта
 * по имени из коллекции ingredients
 *
 * NOTE: чтобы ускорить - создать индекс
 * для title ингредиента в коллекции ingredients
 */
export const getRecipeIngredientsAggrPipeline = () => [
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
  removeFields('ingredients_details', 'ingredients._id'),
];
