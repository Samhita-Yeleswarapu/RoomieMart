import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Browse from "./pages/Browse";
import SellItem from "./pages/SellItem";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Demands from "./pages/Demands";
import Rentals from "./pages/Rentals";
import Notifications from "./pages/Notifications";
import MyListings from "./pages/MyListings";
import NotFound from "./pages/NotFound";
import EditProduct from "./pages/EditProduct";
function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      <Navbar />

      <main className="flex-grow">

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/browse"
            element={<Browse />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/sell"
            element={<SellItem />}
          />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/chat/:roomId"
            element={<Chat />}
          />

           <Route
            path="/chat"
            element={<Chat />}
          />
          <Route
            path="/demands"
            element={<Demands />}
          />

          <Route
            path="/rentals"
            element={<Rentals />}
          />

          <Route
            path="/notifications"
            element={<Notifications />}
          />

          <Route
            path="/my-listings"
            element={<MyListings />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
           <Route
  path="/edit-product/:id"
  element={<EditProduct />}
/>
        </Routes>

      </main>

      <Footer />

    </div>
  );
}

export default App;