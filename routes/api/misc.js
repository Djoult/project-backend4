import express from 'express';
import { validateBody } from '../../decorators/index.js';
import { isEmptyBody, isValidId } from '../../middlewares/index.js';
import { ctrl } from '../../controllers/misc/index.js';

const router = express.Router();

// список тары
router.get('/glass', ctrl.getGlassList);

// список ингредиентов
router.get('/ingredients/list', ctrl.getIngredientList);

export default router;
