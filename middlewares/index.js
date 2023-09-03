import { ctrlWrapper } from '../decorators/index.js';
import { authenticate as auth } from './authenticate.js';
import { isEmptyBody as _isEmptyBody } from './isEmptyBody.js';
import { isRecipeExists as _isRecipeExists } from './recipe/isRecipeExists.js';
import { isValidId as _isValidId } from './isValidId.js';
import { isUserExists as _isUserExists } from './recipe/isUserExists.js';
import { processDrinkThumb as processThumb } from './recipe/processDrinkThumb.js';
import { removeDrinkThumbOnError as removeThumbOnError } from './recipe/removeDrinkThumbOnError.js';
import { handleError } from '../decorators/handleError.js';

export { default as upload } from './upload.js';
export const authenticate = ctrlWrapper(auth);
export const isEmptyBody = ctrlWrapper(_isEmptyBody);
export const isRecipeExists = ctrlWrapper(_isRecipeExists);
export const isValidId = ctrlWrapper(_isValidId);
export const isUserExists = ctrlWrapper(_isUserExists);
export const processDrinkThumb = ctrlWrapper(processThumb);
export const removeDrinkThumbOnError = handleError(removeThumbOnError);
