import { UserModel } from "../models/UserModel.js";

export const isAdmin = async (
  req,
  res,
  next
) => {
  try {
    const user =
      await UserModel.findById(
        req.userId
      );

    if (
      !user ||
      user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Admin access required"
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message
    });
  }
};