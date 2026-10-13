import { Router } from "express";
import { AuthController } from "../../src/controller/AuthController";

const router = Router();
const controller = new AuthController();

router.post("/login", controller.login);

export default router;
