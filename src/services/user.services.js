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
export {
    getUserProfile,
    updateUserProfile,
    changePassword,
    getCurrentUser
};