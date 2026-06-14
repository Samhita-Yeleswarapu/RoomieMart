import express from "express";

import {
  createRental,
  getRentals,
  updateRental,
  deleteRental
} from "../controllers/rentalController.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router =
  express.Router();

router.post(
  "/",
  verifyToken,
  createRental
);

router.get(
  "/",
  getRentals
);

router.put(
  "/:id",
  verifyToken,
  updateRental
);

router.delete(
  "/:id",
  verifyToken,
  deleteRental
);

export default router;