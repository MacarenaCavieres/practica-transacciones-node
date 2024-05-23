import { Router } from "express";
import { TransMethod } from "../controllers/transfer.controller.js";

const router = Router();

router.get("/", TransMethod.getAllTrans);
router.get("/:email", TransMethod.getOneTrans);
router.post("/", TransMethod.postOneTrans);

export default router;
