import { NotificationModel } from "../models/NotificationModel.js";

export const getNotifications =
  async (req, res) => {
    try {
      const notifications =
        await NotificationModel.find({
          userId:
            req.userId
        }).sort({
          createdAt: -1
        });

      res.json(
        notifications
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

export const markAsRead =
  async (req, res) => {
    try {
      const notification =
        await NotificationModel.findByIdAndUpdate(
          req.params.id,
          {
            isRead: true
          },
          { new: true }
        );

      res.json(
        notification
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };