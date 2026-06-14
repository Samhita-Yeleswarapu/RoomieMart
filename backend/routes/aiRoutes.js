import express from "express";

import {
  getPriceSuggestion,
  getDescription,
  scamCheck
} from "../controllers/aiController.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router =
  express.Router();

router.post(
  "/price",
  verifyToken,
  getPriceSuggestion
);

router.post(
  "/description",
  verifyToken,
  getDescription
);

router.post(
  "/scam-check",
  verifyToken,
  scamCheck
);

export default router;