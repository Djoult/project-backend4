import express from "express";
import ctrl from "../../controllers/users/index.js";
import {
  validateBody,
  isEmptyBody,
  authenticate,
  uploadAvatar,
  modifyAvatar,
} from "../../middlewares/index.js";

import {
  updateSubscriptionStatusSchema,
  userEmailSchema,
  userSingUpAndSingInSchema,
} from "../../schemas/index.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userSingUpAndSingInSchema),
  ctrl.register
);

usersRouter.get("/verify/:verificationToken", ctrl.verifyEmail);

usersRouter.post(
  "/verify/",
  isEmptyBody,
  validateBody(userEmailSchema),
  ctrl.resendVerifyEmail
);

usersRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userSingUpAndSingInSchema),
  ctrl.login
);

usersRouter.post("/logout", authenticate, ctrl.logout);

usersRouter.get("/current", authenticate, ctrl.current);

usersRouter.patch(
  "/",
  authenticate,
  isEmptyBody,
  validateBody(updateSubscriptionStatusSchema),
  ctrl.updateSubscription
);
usersRouter.patch(
  "/avatars",
  authenticate,
  uploadAvatar.single("avatar"),
  modifyAvatar,
  ctrl.updateAvatar
);

export default usersRouter;
