import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/productApi";

function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const categories = [
    "Books",
    "Electronics",
    "Furniture",
    "Cycles",
    "Hostel Essentials",
    "Lab Equipment",
  ];

  const features = [
    {
      title: "Safe Student Trading",
      desc: "Verified campus marketplace."
    },
    {
      title: "Affordable Deals",
      desc: "Save money on essentials."
    },
    {
      title: "Sustainable Living",
      desc: "Reuse quality products."
    }
  ];

  const handleSearch = () => {
    navigate(`/browse?search=${search}`);
  };

  const handleCategory = (category) => {
    navigate(`/browse?category=${category}`);
  };

  return (
    <div className="bg-white">

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-8 py-12">

        <div className="text-center">

          <span className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
            Campus Marketplace
          </span>

          <h1 className="mt-5 text-5xl font-bold text-[#06153A] leading-tight">
            Buy. Sell. Rent.
            <br />
            Exchange.
          </h1>

          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            Everything students need, all in one trusted marketplace.
          </p>

          {/* Search */}

          <div className="mt-8 flex justify-center">

            <div className="flex items-center w-full max-w-2xl border border-gray-200 rounded-full px-5 py-3 shadow-sm">

              <Search
                size={20}
                className="text-gray-400"
              />

              <input
                type="text"
                placeholder="Search books, laptops, cycles..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="flex-1 ml-3 outline-none"
              />

              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-5 py-2 rounded-full"
              >
                Search
              </button>

            </div>

          </div>

          {/* Categories */}

          <div className="mt-6 flex flex-wrap justify-center gap-3">

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  handleCategory(cat)
                }
                className="px-4 py-2 rounded-full border border-gray-200 hover:bg-blue-50 hover:text-blue-700 transition"
              >
                {cat}
              </button>
            ))}

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="max-w-6xl mx-auto px-8 py-4">

        <div className="grid md:grid-cols-3 gap-5">

          <div className="card p-6 text-center">
            <h3 className="text-3xl font-bold text-[#06153A]">
              {products.length}+
            </h3>
            <p className="text-gray-600">
              Active Listings
            </p>
          </div>

          <div className="card p-6 text-center">
            <h3 className="text-3xl font-bold text-[#06153A]">
              200+
            </h3>
            <p className="text-gray-600">
              Students Trading
            </p>
          </div>

          <div className="card p-6 text-center">
            <h3 className="text-3xl font-bold text-[#06153A]">
              50+
            </h3>
            <p className="text-gray-600">
              Rentals Available
            </p>
          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="max-w-7xl mx-auto px-8 py-14">

        <h2 className="text-3xl font-bold text-center text-[#06153A]">
          Why RoomieMart?
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="card p-6 text-center"
            >
              <h3 className="font-semibold text-xl">
                {feature.title}
              </h3>

              <p className="text-gray-600 mt-3">
                {feature.desc}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* TRENDING */}

      <section className="max-w-7xl mx-auto px-8 pb-16">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold text-[#06153A]">
            Trending Near You
          </h2>

          <button
            onClick={() =>
              navigate("/browse")
            }
            className="text-blue-700 font-medium"
          >
            View All →
          </button>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {products
            .slice(0, 4)
            .map((product) => (

              <div
                key={product._id}
                className="card overflow-hidden cursor-pointer hover:shadow-lg transition"
                onClick={() =>
                  navigate(
                    `/product/${product._id}`
                  )
                }
              >

                <img
                  src={
                    product.images?.[0] ||
                    "https://placehold.co/600x400"
                  }
                  alt=""
                  className="h-48 w-full object-cover"
                />

                <div className="p-4">

                  <h3 className="font-semibold">
                    {product.title}
                  </h3>

                  <p className="text-blue-700 font-bold mt-2">
                    ₹
                    {product.sellingPrice}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {product.condition}
                  </p>

                </div>

              </div>

            ))}

        </div>

      </section>

    </div>
  );
}

export default Home;