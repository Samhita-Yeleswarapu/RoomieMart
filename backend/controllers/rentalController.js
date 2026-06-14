import { RentalModel } from "../models/RentalModel.js";

export const createRental = async (
  req,
  res
) => {
  try {
    const rental =
      await RentalModel.create({
        ...req.body,
        ownerId: req.userId,
      });

    res.status(201).json(
      rental
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getRentals = async (
  req,
  res
) => {
  try {
    const rentals =
      await RentalModel.find()
        .populate(
          "ownerId",
          "username email profilePic"
        )
        .populate(
          "productId"
        )
        .sort({
          createdAt: -1,
        });

    res.json(rentals);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateRental = async (
  req,
  res
) => {
  try {
    const rental =
      await RentalModel.findById(
        req.params.id
      );

    if (!rental) {
      return res.status(404).json({
        message:
          "Rental not found",
      });
    }

    if (
      rental.ownerId.toString() !==
      req.userId
    ) {
      return res.status(403).json({
        message:
          "Forbidden",
      });
    }

    const updated =
      await RentalModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteRental = async (
  req,
  res
) => {
  try {
    const rental =
      await RentalModel.findById(
        req.params.id
      );

    if (!rental) {
      return res.status(404).json({
        message:
          "Rental not found",
      });
    }

    if (
      rental.ownerId.toString() !==
      req.userId
    ) {
      return res.status(403).json({
        message:
          "Forbidden",
      });
    }

    await rental.deleteOne();

    res.json({
      success: true,
      message:
        "Rental deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};