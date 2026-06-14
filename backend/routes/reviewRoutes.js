import express from "express";

import {
  createReview,
  getReviews
} from "../controllers/reviewController.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router =
  express.Router();

router.post(
  "/",
  verifyToken,
  createReview
);

router.get(
  "/:sellerId",
  getReviews
);

export default router;