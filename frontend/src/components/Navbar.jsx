import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import logo from "../assets/roomiemart-logo.png";
import { logoutUser } from "../api/authApi";

function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const navClass = ({ isActive }) =>
    `font-medium transition ${
      isActive
        ? "text-blue-700"
        : "text-gray-700 hover:text-blue-700"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">

        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src={logo}
            alt="RoomieMart"
            className="h-16 w-16 object-contain"
          />

          <h1 className="brand-text">
            <span className="brand-r">R</span>
            <span className="brand-oomie">oomie</span>
            <span className="brand-m">M</span>
            <span className="brand-art">art</span>
          </h1>
        </NavLink>

        {/* Navigation */}
        <div className="hidden lg:flex items-center gap-8">

          <NavLink
            to="/"
            className={navClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/browse"
            className={navClass}
          >
            Browse
          </NavLink>

          <NavLink
            to="/demands"
            className={navClass}
          >
            Demands
          </NavLink>

        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          {!user && !localStorage.getItem("token") ? (
            <div className="flex gap-3">

              <NavLink
                to="/login"
                className="px-5 py-2.5 rounded-full border border-gray-200 text-gray-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="px-5 py-2.5 rounded-full border border-gray-200 text-gray-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                Register
              </NavLink>

            </div>
          ) : (
            <div className="relative group">

              <button className="h-11 w-11 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-700">
                {user?.username?.[0]?.toUpperCase() || "U"}
              </button>

              <div className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">

                <div className="p-4 border-b">
                  <p className="font-semibold text-[#06153A]">
                    {user?.username || "RoomieMart User"}
                  </p>
                </div>

                <NavLink
                  to="/profile"
                  className="block px-5 py-3 hover:bg-gray-50"
                >
                  My Dashboard
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 rounded-b-2xl"
                >
                  Logout
                </button>

              </div>

            </div>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;