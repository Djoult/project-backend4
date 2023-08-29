import express from "express";
import { subscribe } from "../../controllers/subscribe/subscribe.js";
import { unsubscribe } from "../../controllers/subscribe/unsubscribe.js";

const router = express.Router();

router.post("/subscribe", subscribe);
router.post("/unsubscribe", unsubscribe);

export default router;