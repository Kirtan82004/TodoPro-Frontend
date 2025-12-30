import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { registerUser } from "../services/auth.services.js";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value || "" });
  };

  const handleSubmit = async (e) => {
    console.log("Form Data on Submit:", formData);
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await registerUser(formData);
      if (res.success) {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        setError(res.message || "Something went wrong!");
      }
    } catch (err) {
      setError(err.message || "Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <p className="text-sm text-center text-gray-500 mt-1">
          Start managing your tasks efficiently
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Username */}
          <Input
            label="Username"
            name="username"
            placeholder="John"
            value={formData.username || ""}
            onChange={handleChange}
          />

          {/* Full Name */}
          <Input
            label="Full Name"
            name="fullName"
            placeholder="John Doe"
            value={formData.fullName || ""}
            onChange={handleChange}
          />

          {/* Email */}
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email || ""}
            onChange={handleChange}
          />

          {/* Password */}
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password || ""}
            onChange={handleChange}
          />

          <Button type="submit" className="w-full">
            {loading ? <Loader size={18} /> : "Register"}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

/* Reusable Input Component */
const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <input
      {...props}
      className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>
);
