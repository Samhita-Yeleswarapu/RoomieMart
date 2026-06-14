import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },

    reason: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "reviewed"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

export const ReportModel = mongoose.model(
  "Report",
  reportSchema
);