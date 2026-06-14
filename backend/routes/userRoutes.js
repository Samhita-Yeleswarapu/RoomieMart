import express from "express";

import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser
} from "../controllers/userController.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router =
  express.Router();

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.get(
  "/current-user",
  verifyToken,
  getCurrentUser
);

router.get(
  "/logout",
  logoutUser
);

export default router;