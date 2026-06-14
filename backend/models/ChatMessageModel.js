import mongoose from "mongoose";

const chatMessageSchema =
  new mongoose.Schema(
    {
      roomId: {
        type: String,
        required: true
      },

      senderId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },

      receiverId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
      },

      message: {
        type: String,
        required: true
      }
    },
    {
      timestamps: true
    }
  );

export const ChatMessageModel =
  mongoose.model(
    "ChatMessage",
    chatMessageSchema
  );