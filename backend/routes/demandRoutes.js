import express from "express";

import {
  createDemand,
  getDemands,
  updateDemand,
  deleteDemand,
  addReply
} from "../controllers/demandController.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router =
  express.Router();

router.post(
  "/",
  verifyToken,
  createDemand
);

router.get(
  "/",
  getDemands
);

router.post(
  "/:id/reply",
  verifyToken,
  addReply
);

router.put(
  "/:id",
  verifyToken,
  updateDemand
);

router.delete(
  "/:id",
  verifyToken,
  deleteDemand
);

export default router;