import { Router } from "express";
import { createProduct, getAllCustomers, getAllOrders, getAllProducts, getDasboardStats, updateOrderStatus, updateProduct } from "../controllers/admin.controller.js";
import { adminOnly, protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

//Optimization DRY (Do not repeat your code)
router.use(protectRoute, adminOnly)

router.post("/products", upload.array("images",3), createProduct);
router.get("/products", getAllProducts);
router.put("/products/:id",upload.array("images",3), updateProduct);

//PUT: I used put on the previous one to update the whole info of the product
//PATCH: I used patch on the orders because I want to update the satus of order only

router.get("/orders", getAllOrders);
router.patch("/orders/:orderId/status", updateOrderStatus);

router.get("/customers", getAllCustomers);

router.get("/stats", getDasboardStats);


export default router;