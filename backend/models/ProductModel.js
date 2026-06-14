import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    condition: {
      type: String,
      enum: [
        "New",
        "Like New",
        "Good",
        "Fair",
        "Used",
      ],
      required: true,
    },

    listingType: {
      type: String,
      enum: ["sale", "rent"],
      default: "sale",
    },

    rentalPrice: {
      type: Number,
      default: 0,
    },

    rentalDuration: {
      type: Number,
      default: 0,
    },

    originalPrice: {
      type: Number,
    },

    sellingPrice: {
      type: Number,
      default: 0,
    },

    images: [String],

    status: {
      type: String,
      enum: [
        "available",
        "sold",
        "reserved",
      ],
      default: "available",
    },

    views: {
      type: Number,
      default: 0,
    },

    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const ProductModel =
  mongoose.model(
    "Product",
    productSchema
  );