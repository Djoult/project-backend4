import express from 'express';
import { validateBody } from '../../decorators/index.js';
import { ctrl } from '../../controllers/misc/index.js';

import {
  isEmptyBody,
  isValidId,
  authenticate,
} from '../../middlewares/index.js';

const router = express.Router();


// список тары
// recipes/glass?sort={asc|desc}
router.get('/glass', authenticate, ctrl.getGlassList);

export default router;
