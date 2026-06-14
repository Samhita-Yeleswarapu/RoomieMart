import { UserModel } from "../models/UserModel.js";

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await UserModel.findById(req.userId);

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    res.json({
      success: true,
      message: "Added to wishlist"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await UserModel.findById(req.userId);

    user.wishlist = user.wishlist.filter(
      item => item.toString() !== productId
    );

    await user.save();

    res.json({
      success: true,
      message: "Removed from wishlist"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId)
      .populate("wishlist");

    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};