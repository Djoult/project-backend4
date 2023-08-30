import { HTTP_STATUS, DEF_LIMIT, DEF_PAGE } from '../../constants/index.js';
import { Recipe } from '../../models/index.js';
import { recipeAggregationStages } from '../../helpers/index.js';

export const getMainPageRecipes = async ({ query }, res) => {
  let { category, samples } = query;

  const pipeline = recipeAggregationStages.groupRecipesByCategory(
    category,
    samples
  );

  const result = await Recipe.aggregate(pipeline);
  res.json(result);
};
