import express from "express";

import {
  createReport,
  getReports,
  updateReportStatus
} from "../controllers/reportController.js";

import { verifyToken } from "../middleware/verifyToken.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router =
  express.Router();

router.post(
  "/",
  verifyToken,
  createReport
);

router.get(
  "/",
  verifyToken,
  isAdmin,
  getReports
);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  updateReportStatus
);

export default router;