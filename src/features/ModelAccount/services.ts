import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "lib/axiosInstance";
import { errorHandler } from "lib/errorhandler";

export const getUser = createAsyncThunk("get/user", async (id: string) => {
  try {
    const response = await axiosInstance.get(`/model/${id}`);
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
});

// export const getUser = async (id: string) => {
//   try {
//     const response = await axiosInstance.get(`/model/${id}`);
//     return response.data;
//   } catch (error) {
//     return errorHandler(error);
//   }
// };
