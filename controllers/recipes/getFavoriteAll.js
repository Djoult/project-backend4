import { search } from './search.js';

export const getFavoriteAll = async (req, res) => {
  req.query = { ...req.query, favorite: 'true' };
  await search(req, res);
};
