import conf from "../config/conf";
import axios from "axios";

const API_URL = conf.API_URL;

const getUserProfile = async (token) => {
    const res = await axios.get(`${API_URL}/users/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
    });
    return res.data;
};

const updateUserProfile = async (token, profileData) => {
    const res = await axios.put(`${API_URL}/users/profile`, profileData, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
    });
    return res.data;
};

const changePassword = async (token, passwordData) => {
   const res = await axios.post(`${API_URL}/users/change-password`, passwordData, {
       headers: {
           'Authorization': `Bearer ${token}`,
         },
            withCredentials: true,
        });
    return res.data;
};

const getCurrentUser = async (token) => {
    const res = await axios.get(`${API_URL}/users/me`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
    });
    return res.data;
}
const updateAvatar = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append("avatar", imageFile);

        const res = await axios.patch(`${API_URL}/users/upload-avatar`, formData, {
            withCredentials: true,
            headers: { 
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}` 
            }
        });
        console.log("UpdateProfileImage Response:", res);
        window.alert("Profile image updated successfully!");
        return res.data;
    } catch (error) {
        console.error("UpdateProfileImage Error:", error);
        window.alert(error.response?.data?.message || "Image update failed!");
        return error.response?.data || { success: false };
    }
};

export {
    getUserProfile,
    updateUserProfile,
    changePassword,
    getCurrentUser,
    updateAvatar
};