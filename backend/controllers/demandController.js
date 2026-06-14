import { DemandModel } from "../models/DemandModel.js";

export const createDemand = async (req, res) => {
  try {
    const demand = await DemandModel.create({
      ...req.body,
      userId: req.userId
    });

    const populatedDemand = await DemandModel.findById(demand._id)
      .populate("userId", "username email profilePic");

    res.status(201).json(populatedDemand);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getDemands = async (req, res) => {
  try {
    const demands = await DemandModel.find()
      .populate("userId", "username email profilePic")
      .populate("replies.userId", "username email profilePic")
      .sort({ createdAt: -1 });

    res.json(demands);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const addReply = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Reply text is required"
      });
    }

    const demand = await DemandModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          replies: {
            userId: req.userId,
            text
          }
        }
      },
      { new: true }
    )
      .populate("userId", "username email profilePic")
      .populate("replies.userId", "username email profilePic");

    if (!demand) {
      return res.status(404).json({
        message: "Demand not found"
      });
    }

    res.status(201).json(demand);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const updateDemand = async (req, res) => {
  try {
    const demand =
      await DemandModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(demand);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteDemand = async (req, res) => {
  try {
    await DemandModel.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Demand deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};