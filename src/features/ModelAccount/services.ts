import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, { axiosMediaInstance } from "lib/axiosInstance";
import { errorHandler } from "lib/errorhandler";

export const getUser = createAsyncThunk(
  "get/user",
  async ({ id, obj }: any) => {
    try {
      if (obj && obj.userId) {
        return obj;
      }
      const response = await axiosInstance.get(`/model/${id}`);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const getUserMedia = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/media/${id}`);
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const getUserMediaAction = createAsyncThunk(
  "get/user/media",
  getUserMedia
);

export const updateThumbnail = async (data: FormData) => {
  try {
    const response = await axiosMediaInstance.put("/model", data);
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const updateThumbnailAction = createAsyncThunk(
  "update/user/thumbnail",
  updateThumbnail
);
