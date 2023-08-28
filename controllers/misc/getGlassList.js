import { glassList } from '../../constants/index.js';
import { HttpError } from '../../helpers/index.js';
import { HTTP_STATUS } from '../../constants/index.js';

export const getGlassList = async (req, res) => {
  res.json(glassList);
};
