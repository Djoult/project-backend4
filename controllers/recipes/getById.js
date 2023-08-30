import { HTTP_STATUS } from '../../constants/index.js';
import { Recipe } from '../../models/index.js';

import { db, HttpError, recipeAggregationStages } from '../../helpers/index.js';

export const getById = async ({ params: { id } }, res) => {
  const { lookupIngredients } = recipeAggregationStages;

  const result = await Recipe.aggregate([
    {
      $match: {
        _id: db.makeObjectId(id),
      },
    },
    ...lookupIngredients(),
  ]);

  if (!result) throw HttpError(HTTP_STATUS.notFound);
  res.json(result);
};
