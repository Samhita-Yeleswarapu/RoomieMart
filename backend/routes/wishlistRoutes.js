import express from "express";

import {
  addToWishlist,
  removeFromWishlist,
  getWishlist
} from "../controllers/wishlistController.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router =
  express.Router();

router.post(
  "/",
  verifyToken,
  addToWishlist
);

router.get(
  "/",
  verifyToken,
  getWishlist
);

router.delete(
  "/:productId",
  verifyToken,
  removeFromWishlist
);

export default router;