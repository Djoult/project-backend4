import express from "express";
import { authSchema } from "../../schemas/index.js";
import { authController } from "../../controllers/index.js";
import { validateBody, authenticate, upload } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post(
  "/singup",
  validateBody(authSchema.userSingUp),
  authController.singUp
);
authRouter.post(
  "/singin",
  validateBody(authSchema.userSingIn),
  authController.singIn
);
authRouter.patch(
  "/avatars",
  upload.single("avatar"),
  authenticate,
  authController.updateUser
);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.get("/verify/:verificationToken", authController.verify);
// authRouter.post(
//   "/verify",
//   validateBody(authSchema.userEmail),
//   authController.resendVerify
// );
authRouter.post("/logout", authenticate, authController.logOut);

export default authRouter;
