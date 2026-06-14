import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getProduct } from "../api/productApi";
import { addToWishlist } from "../api/wishlistApi";
import useAuthStore from "../store/authStore";

function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuthStore();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct =
    async () => {
      try {
        const data =
          await getProduct(id);

        setProduct(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

  const handleWishlist =
    async () => {
      try {
        await addToWishlist(
          product._id
        );

        alert(
          "Added to Wishlist ❤️"
        );
      } catch (error) {
        console.log(error);
        alert(
          "Unable to add to wishlist"
        );
      }
    };

  const handleChatSeller =
    () => {
      if (!user) {
        alert(
          "Please login first"
        );
        return;
      }

      if (
        !product?.sellerId?._id
      ) {
        alert(
          "Seller information unavailable"
        );
        return;
      }

      if (
        user._id ===
        product.sellerId._id
      ) {
        alert(
          "This is your own product"
        );
        return;
      }

      const roomId =
        [
          user._id,
          product.sellerId._id,
        ]
          .sort()
          .join("_");

      navigate(
        `/chat/${roomId}`
      );
    };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-xl text-red-500">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">

      <div className="grid lg:grid-cols-2 gap-12">

        {/* Product Image */}

        <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-3xl p-6">

          <img
            src={
              product.images?.[0] ||
              "https://placehold.co/700x500"
            }
            alt={product.title}
            className="w-full h-[500px] object-cover rounded-2xl"
          />

        </div>

        {/* Product Info */}

        <div>

          <p className="text-blue-600 font-semibold uppercase tracking-wider">
            RoomieMart Product
          </p>

          <h1 className="text-5xl font-bold text-[#06153A] mt-2">
            {product.title}
          </h1>

          <p className="text-4xl font-bold text-blue-700 mt-6">
            ₹{product.sellingPrice}
          </p>

          <div className="mt-8 bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-6">

            <h3 className="font-semibold text-xl mb-3 text-[#06153A]">
              Description
            </h3>

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

          </div>

          {/* Action Buttons */}

          <div className="flex gap-4 mt-10">

            <button
              onClick={
                handleWishlist
              }
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl transition"
            >
              ❤️ Add To Wishlist
            </button>

            <button
              onClick={
                handleChatSeller
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
            >
              💬 Chat Seller
            </button>

          </div>
           {
  product.listingType === "rent"
    ? (
      <>
        ₹{product.rentalPrice}
        <span>/day</span>
      </>
    )
    : (
      <>₹{product.sellingPrice}</>
    )
}
{
  product.listingType === "rent" && (
    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl inline-block">
      Available For Rent
    </div>
  )
}
          {/* Product Details */}

          <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-5">

            <h3 className="font-semibold text-lg mb-3">
              Product Details
            </h3>

            <div className="space-y-2 text-gray-600">

              <p>
                <span className="font-medium">
                  Category:
                </span>{" "}
                {product.category ||
                  "General"}
              </p>

              <p>
                <span className="font-medium">
                  Condition:
                </span>{" "}
                {product.condition ||
                  "Good"}
              </p>

              <p>
                <span className="font-medium">
                  Original Price:
                </span>{" "}
                ₹
                {product.originalPrice ||
                  0}
              </p>

              <p>
                <span className="font-medium">
                  Location:
                </span>{" "}
                {product.location ||
                  "Not specified"}
              </p>

              <p>
                <span className="font-medium">
                  Views:
                </span>{" "}
                {product.views ||
                  0}
              </p>

              <p>
                <span className="font-medium">
                  Posted:
                </span>{" "}
                {new Date(
                  product.createdAt
                ).toLocaleDateString()}
              </p>

            </div>

          </div>

          {/* Seller Information */}

          <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5">

            <h3 className="font-semibold text-lg mb-3 text-[#06153A]">
              Seller Information
            </h3>

            <p>
              <span className="font-medium">
                Username:
              </span>{" "}
              {product.sellerId
                ?.username ||
                "Unknown"}
            </p>

            <p>
              <span className="font-medium">
                Email:
              </span>{" "}
              {product.sellerId
                ?.email ||
                "Not available"}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;