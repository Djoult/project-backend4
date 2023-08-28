import express from 'express';
import { validateBody } from '../../decorators/index.js';
import { isEmptyBody, isValidId } from '../../middlewares/index.js';
import { ctrl } from '../../controllers/misc/index.js';

const router = express.Router();

// список тары
// recipes/glass?sort={asc|desc}
router.get('/glass', ctrl.getGlassList);

export default router;
