import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
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
