import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/authApi";
import useAuthStore from "../store/authStore";

function Login() {
  const navigate = useNavigate();

  const { setUser, setToken } =
    useAuthStore();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data =
        await loginUser(formData);

      setUser(data.user);

      setToken(data.token);

      localStorage.setItem(
        "token",
        data.token
      );

      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-20">
      <form
        onSubmit={handleSubmit}
        className="card p-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-[#06153A] mb-8">
          Welcome Back
        </h2>

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-xl"
        >
          {loading
            ? "Logging In..."
            : "Login"}
        </button>

        <p className="mt-5 text-center">
          <Link
            to="/register"
            className="text-blue-700"
          >
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;