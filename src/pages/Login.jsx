import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {loginUser} from "../services/auth.services.js";
import Button from "../components/Button";
import Loader from "../components/Loader";

import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice.js";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.identifier || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser(formData);
      console.log("Login Response:", res);
      dispatch(loginSuccess(res.user));
      
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen text="Logging in..." />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900">
      <div className="w-full max-w-md bg-white dark:bg-zinc-800 rounded-2xl shadow p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Welcome Back 👋
        </h2>

        <p className="text-sm text-center text-gray-500 mt-1">
          Login to manage your todos
        </p>

        {error && (
          <p className="mt-4 text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            name="identifier"
            placeholder="Email or Username"
            value={formData.identifier}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border dark:bg-zinc-700 dark:border-zinc-600"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border dark:bg-zinc-700 dark:border-zinc-600"
          />

          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            Login
          </Button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
