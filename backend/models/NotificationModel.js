import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    message: {
      type: String,
      required: true
    },

    type: {
      type: String
    },

    isRead: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export const NotificationModel = mongoose.model(
  "Notification",
  notificationSchema
);