import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "lib/axiosInstance";
import { errorHandler } from "lib/errorhandler";
import { JobAttributesType } from "./types";

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

export const createJob = createAsyncThunk(
  "create/client/jobs",
  async (data: JobAttributesType) => {
    try {
      const response = await axiosInstance.post(`/job`, data);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);
