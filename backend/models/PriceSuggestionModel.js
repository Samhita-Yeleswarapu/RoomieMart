import mongoose from "mongoose";

const priceSuggestionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    productType: String,

    condition: String,

    suggestedPrice: Number
  },
  {
    timestamps: true
  }
);

export const PriceSuggestionModel = mongoose.model(
  "PriceSuggestion",
  priceSuggestionSchema
);