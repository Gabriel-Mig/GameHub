import { Router } from "express";
import { ProductController } from "../../src/controller/ProductController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const controller = new ProductController();

router.get("/", authMiddleware, controller.dashboard);

export default router;
