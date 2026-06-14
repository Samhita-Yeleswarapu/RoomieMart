import mongoose from "mongoose";

const rentalSchema =
  new mongoose.Schema(
    {
      ownerId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      productId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },

      rentalPrice: {
        type: Number,
        required: true,
      },

      durationDays: {
        type: Number,
        required: true,
      },

      available: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

export const RentalModel =
  mongoose.model(
    "Rental",
    rentalSchema
  );