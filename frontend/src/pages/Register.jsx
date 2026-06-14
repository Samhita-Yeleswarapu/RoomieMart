import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      username: "",
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

      await registerUser(formData);

      alert(
        "Account Created Successfully"
      );

      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Registration Failed");
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
          Create Account
        </h2>

        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-4"
        />

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

        <button className="w-full bg-blue-600 text-white py-3 rounded-xl">
          {loading
            ? "Creating..."
            : "Register"}
        </button>

        <p className="mt-5 text-center">
          <Link
            to="/login"
            className="text-blue-700"
          >
            Already have an account?
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Register;