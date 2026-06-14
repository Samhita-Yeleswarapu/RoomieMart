import { useEffect, useState } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { getProducts } from "../api/productApi";

function Browse() {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] =
    useState([]);

  const [
    filteredProducts,
    setFilteredProducts,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const params =
      new URLSearchParams(
        location.search
      );

    const searchQuery =
      params.get("search") || "";

    const categoryQuery =
      params.get("category") || "";

    setSearch(searchQuery);
    setCategory(categoryQuery);
  }, [location.search]);

  useEffect(() => {
    applyFilters();
  }, [products, search, category]);

  const fetchProducts =
    async () => {
      try {
        const data =
          await getProducts();

        if (
          Array.isArray(data)
        ) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.log(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

  const applyFilters =
    () => {
      let temp =
        [...products];

      if (search) {
        const query =
          search.toLowerCase();

        temp =
          temp.filter(
            (product) =>
              product.title
                ?.toLowerCase()
                .includes(query) ||
              product.description
                ?.toLowerCase()
                .includes(query) ||
              product.category
                ?.toLowerCase()
                .includes(query)
          );
      }

      if (category) {
        temp =
          temp.filter(
            (product) =>
              product.category
                ?.toLowerCase() ===
              category.toLowerCase()
          );
      }

      setFilteredProducts(
        temp
      );
    };

  if (loading) {
    return (
      <div className="text-center py-24 text-xl">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#06153A]">
          Browse Products
        </h1>

        <p className="text-gray-500 mt-2">
          Discover great deals from students
        </p>
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search books, laptops, cycles..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            w-full
            border
            border-gray-200
            rounded-2xl
            px-5
            py-4
            focus:outline-none
            focus:ring-2
            focus:ring-blue-200
          "
        />
      </div>

      {category && (
        <div className="mb-8">
          <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm">
            Category: {category}
          </span>
        </div>
      )}

      {filteredProducts.length ===
      0 ? (
        <div className="text-center py-24">
          <h2 className="text-2xl font-semibold text-gray-600">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-2">
            Try another search
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredProducts.map(
            (product) => (
              <div
                key={product._id}
                className="
                  bg-white
                  border
                  border-gray-100
                  rounded-3xl
                  overflow-hidden
                  shadow-sm
                  hover:shadow-lg
                  transition
                  cursor-pointer
                "
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
                  className="
                    w-full
                    h-56
                    object-cover
                  "
                />

                <div className="p-6">

                  <div className="flex justify-between items-center mb-3">

                    <h2 className="text-xl font-semibold text-[#06153A]">
                      {product.title}
                    </h2>

                    <div className="flex gap-2">

                      <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                        {
                          product.category
                        }
                      </span>

                      {product.listingType ===
                      "rent" ? (
                        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                          Rent
                        </span>
                      ) : (
                        <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                          Sale
                        </span>
                      )}

                    </div>

                  </div>

                  {product.listingType ===
                  "rent" ? (
                    <p className="text-green-700 text-2xl font-bold mt-3">
                      ₹
                      {
                        product.rentalPrice
                      }
                      <span className="text-sm text-gray-500">
                        {" "}
                        / day
                      </span>
                    </p>
                  ) : (
                    <p className="text-blue-700 text-2xl font-bold mt-3">
                      ₹
                      {
                        product.sellingPrice
                      }
                    </p>
                  )}

                  <p className="text-gray-600 mt-3 line-clamp-2">
                    {
                      product.description
                    }
                  </p>

                  <p className="text-sm text-gray-500 mt-3">
                    Condition:
                    {" "}
                    {
                      product.condition
                    }
                  </p>

                  {product.listingType ===
                    "rent" && (
                    <p className="text-sm text-green-600 mt-2">
                      Max Duration:
                      {" "}
                      {
                        product.rentalDuration
                      }
                      {" "}
                      days
                    </p>
                  )}

                  <button
                    onClick={() =>
                      navigate(
                        `/product/${product._id}`
                      )
                    }
                    className="
                      mt-5
                      w-full
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      py-3
                      rounded-xl
                      transition
                    "
                  >
                    View Details
                  </button>

                </div>

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}

export default Browse;