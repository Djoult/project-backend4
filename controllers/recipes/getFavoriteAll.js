import { search } from './search.js';

// GET recipes/favorite
export const getFavoriteAll = async (req, res) => {
  req.query = { ...req.query, favorite: 'true' };
  await search(req, res);
};

