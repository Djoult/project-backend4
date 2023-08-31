import { HTTP_STATUS } from '../../constants/index.js';
import { Recipe } from '../../models/index.js';
import { db, HttpError, recipeAggregationStages } from '../../helpers/index.js';

export const getFavoriteById = async ({ params: { id }, user }, res) => {
  const { _id: owner } = user ?? '';

  const result = await Recipe.aggregate([
    {
      $match: {
        users: { $in: [owner] },
        _id: db.makeObjectId(id),
      },
    },
    ...recipeAggregationStages.lookupIngredients(),
  ]);

  if (!result) throw HttpError(HTTP_STATUS.notFound);
  res.json(result);
};
