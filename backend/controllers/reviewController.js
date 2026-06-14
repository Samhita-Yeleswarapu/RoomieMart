import { ReviewModel } from "../models/ReviewModel.js";
import { UserModel } from "../models/UserModel.js";

export const createReview = async (
  req,
  res
) => {
  try {
    const review =
      await ReviewModel.create({
        ...req.body,
        buyerId: req.userId
      });

    const reviews =
      await ReviewModel.find({
        sellerId:
          req.body.sellerId
      });

    const avg =
      reviews.reduce(
        (acc, item) =>
          acc + item.rating,
        0
      ) / reviews.length;

    await UserModel.findByIdAndUpdate(
      req.body.sellerId,
      {
        rating: avg,
        totalReviews:
          reviews.length
      }
    );

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getReviews = async (
  req,
  res
) => {
  try {
    const reviews =
      await ReviewModel.find({
        sellerId:
          req.params.sellerId
      }).populate(
        "buyerId",
        "username profilePic"
      );

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};