import express from "express";

import {
  saveMessage,
  getMessages,
  getConversations
} from "../controllers/chatController.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router =
  express.Router();

router.get(
  "/conversations/all",
  verifyToken,
  getConversations
);

router.post(
  "/",
  verifyToken,
  saveMessage
);

router.get(
  "/:roomId",
  verifyToken,
  getMessages
);

export default router;