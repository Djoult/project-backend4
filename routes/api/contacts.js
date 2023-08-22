import express from "express";
import ctrl from "../../controllers/contacts/index.js";
import {
  validateBody,
  isEmptyBody,
  isValidId,
  authenticate,
} from "../../middlewares/index.js";
import { addSchema, updateFavoriteSchema } from "../../schemas/index.js";

const router = express.Router();

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, ctrl.getContactById);

router.post(
  "/",
  isEmptyBody,
  authenticate,
  validateBody(addSchema),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContactById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  isEmptyBody,
  validateBody(addSchema),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  isEmptyBody,
  validateBody(updateFavoriteSchema),
  ctrl.updateStatusContact
);

export default router;
