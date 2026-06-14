import mongoose from "mongoose";

const demandSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    replies: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        text: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    fulfilled: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export const DemandModel = mongoose.model("Demand", demandSchema);