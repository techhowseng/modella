import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "lib/axiosInstance";
import { errorHandler } from "lib/errorhandler";

export const getClientJobsActions = createAsyncThunk(
  "get/client/jobs",
  async (id: string) => {
    try {
      const response = await axiosInstance.get(`/job/client/${id}`);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);
