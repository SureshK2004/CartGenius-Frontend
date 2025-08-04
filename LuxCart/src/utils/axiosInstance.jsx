import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

// Base URL for your API
const baseURL = "http://localhost:8000";

// Get tokens from localStorage (NO JSON.parse here)
let token = localStorage.getItem('access') || "";
let refresh_token = localStorage.getItem('refresh') || "";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : null
  }
});

// Request interceptor to refresh token if needed
axiosInstance.interceptors.request.use(async (req) => {
  token = localStorage.getItem('access') || "";
  refresh_token = localStorage.getItem('refresh') || "";

  if (!token) return req;

  const user = jwtDecode(token);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) {
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  }

  try {
    const res = await axios.post(`${baseURL}/api/users/token/refresh/`, {
      refresh: refresh_token
    });

    if (res.status === 200) {
      localStorage.setItem('access', res.data.access);
      req.headers.Authorization = `Bearer ${res.data.access}`;
    }
  } catch (error) {
    console.error("Token refresh failed:", error);
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
  }

  return req;
});

export default axiosInstance;
