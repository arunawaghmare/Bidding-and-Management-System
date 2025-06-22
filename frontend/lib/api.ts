import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://bidding-and-management-system-2.onrender.com/api",
});

instance.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
