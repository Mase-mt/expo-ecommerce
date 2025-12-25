import { Router } from "express";
import { getAllProducts } from "../controllers/admin.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getProductById } from "../controllers/product.controller.js";

const router = Router();

router.use(protectRoute)

router.get("/", getAllProducts);
router.get("/:id", getProductById);

export default router;