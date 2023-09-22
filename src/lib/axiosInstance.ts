import axios from "axios";
import { getSessionToken } from "features/functions";

const axiosInstance = axios.create({
  baseURL:
    "http://localhost:3000/api" || "https://manikeens-lake.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Authorization: `Bearer ${getSessionToken()}`,
  },
});

export const axiosMediaInstance = axios.create({
  baseURL:
    "http://localhost:3000/api" || "https://manikeens-lake.vercel.app/api",
  headers: {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Authorization: `Bearer ${getSessionToken()}`,
  },
});

// var isAbsoluteURLRegex = /^(?:\w+:)\/\//;

// axiosInstance.interceptors.request.use((config) => {
//   console.log('config >>>> ', config);
//   // Concatenate base path if not an absolute URL
//   if (!isAbsoluteURLRegex.test(config.url)) {
//     config.url = `http://localhost:3000/api${config.url}`;
//   }

//   return config;
// });

export default axiosInstance;
