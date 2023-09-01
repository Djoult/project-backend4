import express from 'express';
// import { authSchema } from "../../schemas/index.js";
import { joiSchema } from '../../schemas/users/index.js';
import { authController } from '../../controllers/index.js';
import { authenticate, upload } from '../../middlewares/index.js';
import { validateBody } from '../../decorators/validateBody.js';

const authRouter = express.Router();

authRouter.post(
  '/signup',
  validateBody(joiSchema.signup),
  authController.singUp
);

authRouter.post(
  '/signin',
  validateBody(joiSchema.signin),
  authController.singIn
);

authRouter.patch(
  '/avatars',
  upload.single('avatar'),
  authenticate,
  authController.updateUser
);

authRouter.get('/current', authenticate, authController.getCurrent);

authRouter.get('/verify/:verificationToken', authController.verify);

// authRouter.post(
//   "/verify",
//   validateBody(authSchema.userEmail),
//   authController.resendVerify
// );

authRouter.post('/logout', authenticate, authController.logOut);

export default authRouter;
