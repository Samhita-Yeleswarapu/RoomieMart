import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    rating: {
      type: Number,
      min: 1,
      max: 5
    },

    review: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export const ReviewModel = mongoose.model("Review", reviewSchema);