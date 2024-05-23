import { Router } from "express";
import { TransMethod } from "../controllers/transfer.controller.js";

const router = Router();

router.get("/", TransMethod.getAllTrans);
router.post("/", TransMethod.postOneTrans);

export default router;
