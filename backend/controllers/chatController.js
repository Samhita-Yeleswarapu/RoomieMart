import mongoose from "mongoose";
import { ChatMessageModel } from "../models/ChatMessageModel.js";

export const getConversations = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);

    const msgs = await ChatMessageModel.aggregate([
      {
        $match: {
          $or: [
            { senderId: userId },
            { receiverId: userId }
          ]
        }
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$roomId",
          lastMessage: { $first: "$message" },
          lastAt: { $first: "$createdAt" },
          senderId: { $first: "$senderId" },
          receiverId: { $first: "$receiverId" }
        }
      },
      { $sort: { lastAt: -1 } }
    ]);

    const populated = await ChatMessageModel.populate(msgs, [
      { path: "senderId", select: "username profilePic", model: "User" },
      { path: "receiverId", select: "username profilePic", model: "User" }
    ]);

    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveMessage = async (
  req,
  res
) => {
  try {
    const {
      roomId,
      receiverId,
      message,
    } = req.body;

    const newMessage =
      await ChatMessageModel.create({
        roomId,
        senderId: req.userId,
        receiverId,
        message,
      });

    res.status(201).json(
      newMessage
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMessages = async (
  req,
  res
) => {
  try {
    const messages =
      await ChatMessageModel.find({
        roomId:
          req.params.roomId,
      })
        .populate(
          "senderId",
          "username profilePic"
        )
        .sort({
          createdAt: 1,
        });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};