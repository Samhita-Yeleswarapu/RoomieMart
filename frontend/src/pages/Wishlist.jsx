import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getWishlist,
  removeWishlist,
} from "../api/wishlistApi";

function Wishlist() {
  const [items, setItems] =
    useState([]);

  const navigate =
    useNavigate();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist =
    async () => {
      try {
        const data =
          await getWishlist();

        setItems(data);
      } catch (err) {
        console.log(err);
      }
    };

  const handleRemove =
    async (id) => {
      try {
        await removeWishlist(id);

        setItems((prev) =>
          prev.filter(
            (item) =>
              item._id !== id
          )
        );
      } catch (err) {
        console.log(err);
      }
    };

  const openProduct = (
    productId
  ) => {
    navigate(
      `/product/${productId}`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">

      <h1 className="text-4xl font-bold text-[#06153A] mb-10">
        My Wishlist ❤️
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-12">
          No items in wishlist
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {items.map((item) => (
            <div
              key={item._id}
              className="bg-gradient-to-br from-pink-50 to-white border border-pink-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition"
            >

              <img
                src={
                  item.images?.[0] ||
                  "https://placehold.co/600x400"
                }
                alt={item.title}
                className="h-56 w-full object-cover cursor-pointer"
                onClick={() =>
                  openProduct(
                    item._id
                  )
                }
              />

              <div className="p-6">

                <h2
                  className="text-xl font-semibold cursor-pointer hover:text-blue-600"
                  onClick={() =>
                    openProduct(
                      item._id
                    )
                  }
                >
                  {item.title}
                </h2>

                <p className="text-pink-600 text-2xl font-bold mt-2">
                  ₹
                  {
                    item.sellingPrice
                  }
                </p>

                <p className="text-gray-600 mt-3 line-clamp-2">
                  {
                    item.description
                  }
                </p>

                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() =>
                      openProduct(
                        item._id
                      )
                    }
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() =>
                      handleRemove(
                        item._id
                      )
                    }
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Wishlist;