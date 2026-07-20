import axios from "axios";

const backendApi = axios.create({
  baseURL: "https://smartschool-backend-cx5b.onrender.com",
  withCredentials: true,
});

export default backendApi;
