import { search } from './search.js';

export const getPopularAll = async (req, res) => {
  req.query = { ...req.query, sort: 'users:desc' };
  await search(req, res);
};
