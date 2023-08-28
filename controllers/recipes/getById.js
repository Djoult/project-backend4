import { HTTP_STATUS } from '../../constants/index.js';
import { Recipe } from '../../models/index.js';

import {
  db,
  HttpError,
  getRecipeIngredientsAggrPipeline,
} from '../../helpers/index.js';

export const getById = async ({ params: { id } }, res) => {
  const pipeline = getRecipeIngredientsAggrPipeline();

  // добавляем в коныеер соотвествие заданному id
  const result = await Recipe.aggregate([
    {
      $match: {
        _id: db.makeObjectId(id),
      },
    },
    ...pipeline,
  ]);
  if (!result) throw HttpError(HTTP_STATUS.notFound);
  res.json(result);
};
