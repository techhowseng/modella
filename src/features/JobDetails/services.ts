import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "lib/axiosInstance";
import { errorHandler } from "lib/errorhandler";
import queryString from "query-string";

export const getJobService = async (jobId: string | number) => {
  try {
    const response = await axiosInstance.get(`/job/${jobId}`);
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const getJobAction = createAsyncThunk("get/job", getJobService);

export const getJobsActions = createAsyncThunk(
  "get/jobs",
  async (search: any = null) => {
    try {
      const url = search ? `/job?${queryString.stringify(search)}` : "/job";
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const applyToJobAction = createAsyncThunk(
  "apply/job",
  async (jobId: string | number) => {
    try {
      const response = await axiosInstance.post(`/job/${jobId}`);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);
