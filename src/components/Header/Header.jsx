import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LogOut, LogIn, UserPlus } from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../services/auth.services.js";
import { logout } from "../../store/authSlice.js";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, user } = useSelector((state) => state.auth);

  const onLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="w-full bg-white dark:bg-zinc-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        {
          !status ? (
            <Link to="/" className="text-xl font-bold text-blue-600">
              Todo<span className="text-black dark:text-white">Pro</span>
            </Link>
          ):(
            <Link to="/dashboard" className="text-xl font-bold text-blue-600">
        Todo<span className="text-black dark:text-white">Pro</span>
      </Link>
      )
        }


      {/* Links */}
      <div className="flex items-center gap-4">
        {!status ? (
          <>
            <Link
              to="/login"
              className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600"
            >
              <LogIn size={16} /> Login
            </Link>

            <Link
              to="/register"
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              <UserPlus size={16} /> Get Started
            </Link>
          </>
        ) : (
          <>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Hi, <span className="font-medium">{user?.fullName}</span>
            </span>

            <Link
              to="/dashboard"
              className="text-sm hover:text-blue-600"
            >
              Dashboard
            </Link>

            <Link
              to="/profile"
              className="text-sm hover:text-blue-600"
            >
              Profile
            </Link>

            <button
              onClick={onLogout}
              className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm"
            >
              <LogOut size={16} /> Logout
            </button>
          </>
        )}
      </div>
    </div>
    </nav >
  );
};

export default Navbar;
