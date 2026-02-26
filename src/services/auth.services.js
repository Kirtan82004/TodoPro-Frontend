import conf from "../config/conf";
import axios from "axios";

const API_URL = conf.API_URL;

const registerUser = async (userData) => {
    try {
        console.log("User Data in Service:", userData);
        const res = await axios.post(`${API_URL}/auth/register`, userData);
        const credentials = { identifier: userData.email, password: userData.password };
        console.log("Response from Register API:", res);
        loginUser(credentials);
        return res.data;
    } catch (error) {
        console.error("Error registering user:", error.message);
        throw error;
    }
};

const loginUser = async (credentials) => {
   try {
     console.log("Credentials in Service:", credentials);

   const res = await axios.post(`${API_URL}/auth/login`, credentials, {
    withCredentials: true
   });
   localStorage.setItem("accessToken", res.data.accessToken);
   localStorage.setItem("refreshToken", res.data.refreshToken);
   console.log("Response from Login API:", res);
   return res.data;
   } catch (error) {
     console.error("Error logging in user:", error.message);
     throw error;
   }
}

const logoutUser = async (token) => {
const res = await axios.post(`${API_URL}/auth/logout`, {}, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
    },
    withCredentials: true,
});
return res.data;
}

const refreshToken = async (refreshToken) => {
const res = await axios.post(`${API_URL}/auth/refresh-token`, {
    refreshToken: refreshToken
}, {
    withCredentials: true,
});
return res.data;
}

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshToken
};