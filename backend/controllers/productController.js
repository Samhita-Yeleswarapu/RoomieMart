import { ProductModel } from "../models/ProductModel.js";
import cloudinary from "../config/cloudinary.js";
import { createNotification } from "../utils/createNotification.js";

export const createProduct = async (
  req,
  res
) => {
  try {
  const {
  title,
  description,
  category,
  condition,
  originalPrice,
  sellingPrice,
  location,
  listingType,
  rentalPrice,
  rentalDuration
} = req.body;

    const images = [];

    if (req.files) {
      for (const file of req.files) {
        const result =
          await cloudinary.uploader.upload(
            file.path
          );

        images.push(result.secure_url);
      }
    }

   const product =
  await ProductModel.create({
    sellerId: req.userId,
    title,
    description,
    category,
    condition,
    originalPrice,
    sellingPrice,
    listingType,
    rentalPrice,
    rentalDuration,
    location,
    images
  });

    await createNotification(
      req.userId,
      `Your product "${title}" has been listed successfully.`,
      "listing"
    );

    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    console.error(
      "createProduct error:",
      error
    );

    res.status(500).json({
      message:
        error.message
    });
  }
};

export const getProducts = async (
  req,
  res
) => {
  try {
    const products =
      await ProductModel.find()
        .populate(
          "sellerId",
          "username email profilePic"
        )
        .sort({
          createdAt: -1
        });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message:
        error.message
    });
  }
};

export const getSingleProduct =
  async (req, res) => {
    try {
      const product =
        await ProductModel.findById(
          req.params.id
        ).populate(
          "sellerId",
          "username email profilePic"
        );

      if (!product) {
        return res.status(404).json({
          message:
            "Product not found"
        });
      }

      product.views += 1;

      await product.save();

      res.json(product);
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

export const updateProduct =
  async (req, res) => {
    try {
      const product =
        await ProductModel.findById(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          message:
            "Product not found"
        });
      }

      if (
        product.sellerId.toString() !==
        req.userId
      ) {
        return res.status(403).json({
          message:
            "Forbidden"
        });
      }

      const updated =
        await ProductModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true
          }
        );

      await createNotification(
        req.userId,
        `Your product "${updated.title}" was updated successfully.`,
        "listing"
      );

      res.json(updated);
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

export const deleteProduct =
  async (req, res) => {
    try {
      const product =
        await ProductModel.findById(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          message:
            "Product not found"
        });
      }

      if (
        product.sellerId.toString() !==
        req.userId
      ) {
        return res.status(403).json({
          message:
            "Forbidden"
        });
      }

      await createNotification(
        req.userId,
        `Your product "${product.title}" was deleted.`,
        "listing"
      );

      await product.deleteOne();

      res.json({
        success: true,
        message:
          "Product deleted"
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };