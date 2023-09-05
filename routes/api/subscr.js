import express from "express";
import { subscribe, unsubscribe } from "../../controllers/subscribe/subscribe.js";


const router = express.Router();

router.post("/subscribe/email", subscribe);
router.post("/unsubscribe/:email", unsubscribe);

export default router;