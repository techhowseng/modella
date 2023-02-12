import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "lib/axiosInstance";
import { errorHandler } from "lib/errorhandler";
import {
  BioCompleteFormType,
  ModelAttributesType,
  SocialFormType,
} from "./types";

export const updateModel = createAsyncThunk(
  "update/user/model",
  async (data: BioCompleteFormType | SocialFormType | ModelAttributesType) => {
    try {
      const response = await axiosInstance.put("/model", data);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);
