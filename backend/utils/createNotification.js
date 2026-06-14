import { NotificationModel } from "../models/NotificationModel.js";

export const createNotification =
  async (
    userId,
    message,
    type = "general"
  ) => {
    try {
      await NotificationModel.create({
        userId,
        message,
        type,
      });
    } catch (error) {
      console.log(
        "Notification Error:",
        error
      );
    }
  };