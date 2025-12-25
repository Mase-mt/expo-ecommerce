import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createReview, deleteReview } from "../controllers/review.controllers.js";

const router = Router();

router.use(protectRoute);

router.post("/", createReview);
router.delete("/:reviewId", deleteReview); //Note:- we did not implement this functionality in mobile app, but we build it for the backend just incase

export default router;