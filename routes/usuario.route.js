import { Router } from "express";
import { UserMethod } from "../controllers/usuario.controller.js";

const router = Router();

router.get("/", UserMethod.getAllUsers);
router.get("/:email", UserMethod.getOneUser);
router.post("/", UserMethod.postOneUser);
router.delete("/:email", UserMethod.deleteOneUser);

export default router;
