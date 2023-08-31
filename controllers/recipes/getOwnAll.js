import { search } from './search.js';

export const getOwnAll = async (req, res) => {
  req.query = { ...req.query, own: 'true' };
  await search(req, res);
};
