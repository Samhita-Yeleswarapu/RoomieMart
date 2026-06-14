import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  deleteProduct,
} from "../api/productApi";
import useAuthStore from "../store/authStore";

function MyListings() {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const navigate = useNavigate();

  const { user } = useAuthStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts =
    async () => {
      try {
        const data =
          await getProducts();

        const myProducts =
          data.filter(
            (product) =>
              product.sellerId?._id ===
                user?._id ||
              product.sellerId ===
                user?._id
          );

        setProducts(myProducts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const handleDelete =
    async (productId) => {
      const confirmDelete =
        window.confirm(
          "Delete this listing?"
        );

      if (!confirmDelete) return;

      try {
        await deleteProduct(
          productId
        );

        setProducts((prev) =>
          prev.filter(
            (item) =>
              item._id !==
              productId
          )
        );

        alert(
          "Listing deleted successfully"
        );
      } catch (error) {
        console.log(error);
        alert(
          "Failed to delete listing"
        );
      }
    };

  const handleEdit = (
    productId
  ) => {
    navigate(
      `/edit-product/${productId}`
    );
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading Listings...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-[#06153A]">
            My Listings
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all products you
            have posted
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="bg-white border rounded-3xl p-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            No Listings Yet
          </h2>

          <p className="text-gray-500 mt-3">
            Start selling your first
            item.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(
            (product) => (
              <div
                key={
                  product._id
                }
                className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <img
                  src={
                    product
                      .images?.[0] ||
                    "https://placehold.co/600x400"
                  }
                  alt={
                    product.title
                  }
                  className="h-56 w-full object-cover"
                />

                <div className="p-6">
                  <h2 className="text-xl font-semibold text-[#06153A]">
                    {
                      product.title
                    }
                  </h2>

                  <p className="text-blue-700 text-2xl font-bold mt-3">
                    ₹
                    {
                      product.sellingPrice
                    }
                  </p>

                  <p className="text-gray-600 mt-3 line-clamp-2">
                    {
                      product.description
                    }
                  </p>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() =>
                        handleEdit(
                          product._id
                        )
                      }
                      className="flex-1 border border-blue-300 text-blue-700 py-2 rounded-xl hover:bg-blue-50"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          product._id
                        )
                      }
                      className="flex-1 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default MyListings;