import { Router } from "express";
import { UserMethod } from "../controllers/usuario.controller.js";

const router = Router();

router.get("/", UserMethod.getAllUsers);
router.post("/", UserMethod.postOneUser);

export default router;
