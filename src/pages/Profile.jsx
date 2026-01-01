"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateUserProfile, changePassword, updateAvatar } from "../services/user.services.js"
import { loginSuccess } from "../store/authSlice.js"
import Button from "../components/Button"
import Loader from "../components/Loader"

const Profile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "/placeholder.svg")
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
  })
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  })

  const token =
    useSelector((state) => state.auth?.token) ||
    localStorage.getItem("token")

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        username: user.username || "",
        email: user.email || "",
      })
      setLoading(false)
    }
  }, [user,dispatch])

  // ✅ Avatar Upload Fix
  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const res = await updateAvatar(file)
      console.log("Avatar Upload Response:", res)
      dispatch(loginSuccess(res.user))
      setAvatarPreview(res.user.avatar)

    }
  }


  // ✅ Added (e) parameter
  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    try {
      const res = await updateUserProfile(token, formData)
      dispatch(loginSuccess(res.data))
      alert("Profile updated successfully")
    } catch (err) {
      console.error(err)
      alert("Profile update failed")
    }
  }

  // ✅ Added (e) parameter
  const handlePasswordChange = async (e) => {
    e.preventDefault()
    try {
      await changePassword(token, passwords)
      alert("Password changed successfully")
      setPasswords({ currentPassword: "", newPassword: "" })
    } catch (err) {
      console.error(err)
      alert("Password change failed")
    }
  }

  if (loading) return <Loader fullScreen />

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        {/* Profile Header */}
        <div className="bg-white border rounded-lg p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              {user?.avatar ? (
                <img
                  src={avatarPreview || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-lg font-semibold">
                  {user?.fullName?.charAt(0) || "U"}
                </span>
              )}
            </div>
            <label className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors text-xs">
              Upload
              {/* ✅ onChange instead of onClick */}
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            </label>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {user?.fullName || user?.email?.split("@")[0]}
            </h1>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-600">{user?.username}</p>
            <div className="mt-2">
              <span className="inline-block bg-green-100 text-green-700 text-sm px-2 py-1 rounded">
                Verified User
              </span>
            </div>
          </div>
        </div>

        {/* Profile Update Form */}
        <form
          onSubmit={handleProfileUpdate}
          className="bg-white p-6 rounded-lg shadow space-y-4"
        >
          <h2 className="text-lg font-semibold mb-2">Profile Information</h2>
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
          <Button type="submit">Update Profile</Button>
        </form>

        {/* Password Change Form */}
        <form
          onSubmit={handlePasswordChange}
          className="bg-white p-6 rounded-lg shadow space-y-4"
        >
          <h2 className="text-lg font-semibold mb-2">Change Password</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Current Password"
              type="password"
              value={passwords.currentPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, currentPassword: e.target.value })
              }
            />
            <Input
              label="New Password"
              type="password"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, newPassword: e.target.value })
              }
            />
          </div>
          <Button type="submit" variant="danger">
            Change Password
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Profile

/* Reusable Input */
const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      {...props}
      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
)