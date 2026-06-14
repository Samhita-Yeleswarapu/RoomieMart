import express from "express";

import {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

import { verifyToken } from "../middleware/verifyToken.js";

import { upload } from "../middleware/uploadMiddleware.js";

const router =
  express.Router();

router.post(
  "/",
  verifyToken,
  upload.array(
    "images",
    5
  ),
  createProduct
);

router.get(
  "/",
  getProducts
);

router.get(
  "/:id",
  getSingleProduct
);

router.put(
  "/:id",
  verifyToken,
  updateProduct
);

router.delete(
  "/:id",
  verifyToken,
  deleteProduct
);

export default router;