import { useEffect, useState } from "react";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserProfile,
  changePassword,
} from "../services/user.services";
import { loginSuccess } from "../store/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const token =
    useSelector((state) => state.auth?.token) ||
    localStorage.getItem("token");

  // 🔹 Populate form once user is available
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        username: user.username || "",
        email: user.email || "",
      });
      setLoading(false);
    }
  }, [user]);

  // 🔹 Update profile
  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await updateUserProfile(token, formData);
      dispatch(loginSuccess(res.data));
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Profile update failed");
    }
  };

  // 🔹 Change password
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      await changePassword(token, passwords);
      alert("Password changed successfully");
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch (err) {
      console.error(err);
      alert("Password change failed");
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        {/* 🔹 Profile Info */}
        <form
          onSubmit={handleProfileUpdate}
          className="bg-white p-6 rounded-lg shadow mb-6"
        >
          <h2 className="text-lg font-semibold mb-4">
            Profile Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />

            <Input
              label="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="mt-4">
            <Button type="submit">Update Profile</Button>
          </div>
        </form>

        {/* 🔹 Change Password */}
        <form
          onSubmit={handlePasswordChange}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h2 className="text-lg font-semibold mb-4">
            Change Password
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Current Password"
              type="password"
              value={passwords.currentPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  currentPassword: e.target.value,
                })
              }
            />

            <Input
              label="New Password"
              type="password"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  newPassword: e.target.value,
                })
              }
            />
          </div>

          <div className="mt-4">
            <Button type="submit" variant="danger">
              Change Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

/* 🔹 Reusable Input */
const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
