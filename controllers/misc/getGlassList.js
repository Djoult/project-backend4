import { glassList } from '../../constants/index.js';
import { HttpError, normalizeStr } from '../../helpers/index.js';
import { HTTP_STATUS } from '../../constants/index.js';

const comparator = {
  asc: (a, b) => a.localeCompare(b),
  desc: (b, a) => b.localeCompare(b),
};

export const getGlassList = async ({ query }, res) => {
  let { sort = 'asc' } = query;

  [sort] = normalizeStr(sort);
  const result = glassList.sort(comparator[sort] ?? comparator['asc']);
  res.json(result);
};
