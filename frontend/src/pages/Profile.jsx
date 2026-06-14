import { NavLink } from "react-router-dom";
import useAuthStore from "../store/authStore";

function Profile() {
  const { user } = useAuthStore();

  const card =
    "bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-6 hover:shadow-md transition";

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">

      {/* Header */}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">

        <div className="flex items-center gap-5">

          <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-700">
            {user?.username?.[0]?.toUpperCase() || "U"}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-[#06153A]">
              Hello, {user?.username}
            </h1>

            <p className="text-gray-500">
              {user?.email}
            </p>
          </div>

        </div>

      </div>

      <h2 className="text-2xl font-bold text-[#06153A] mb-6">
        Dashboard
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        <NavLink
          to="/sell"
          className={card}
        >
          <h3 className="font-bold text-lg text-[#06153A]">
            📦 Sell Item
          </h3>

          <p className="text-gray-600 mt-2">
            Post a new product for sale
          </p>
        </NavLink>

        <NavLink
          to="/my-listings"
          className={card}
        >
          <h3 className="font-bold text-lg text-[#06153A]">
            📋 My Listings
          </h3>

          <p className="text-gray-600 mt-2">
            Manage your products
          </p>
        </NavLink>

        <NavLink
          to="/wishlist"
          className={card}
        >
          <h3 className="font-bold text-lg text-[#06153A]">
            ❤️ Wishlist
          </h3>

          <p className="text-gray-600 mt-2">
            View saved products
          </p>
        </NavLink>

        <NavLink
          to="/notifications"
          className={card}
        >
          <h3 className="font-bold text-lg text-[#06153A]">
            🔔 Notifications
          </h3>

          <p className="text-gray-600 mt-2">
            Check recent updates
          </p>
        </NavLink>

        <NavLink
          to="/chat"
          className={card}
        >
          <h3 className="font-bold text-lg text-[#06153A]">
            💬 Messages
          </h3>

          <p className="text-gray-600 mt-2">
            Chat with buyers and sellers
          </p>
        </NavLink>

        <NavLink
          to="/rentals"
          className={card}
        >
          <h3 className="font-bold text-lg text-[#06153A]">
            🏠 Rentals
          </h3>

          <p className="text-gray-600 mt-2">
            Browse rental products
          </p>
        </NavLink>

      </div>

    </div>
  );
}

export default Profile;