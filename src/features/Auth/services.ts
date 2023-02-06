import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "lib/axiosInstance";
import { errorHandler } from "lib/errorhandler";
import { AuthRegistrationFormType } from "./types";

// This action is what we will call using the dispatch in order to trigger the API call.
export const registerUser = createAsyncThunk(
  "register/user",
  async (data: AuthRegistrationFormType) => {
    try {
      const response = await axiosInstance.post("/user", data);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "login/user",
  async (data: AuthRegistrationFormType) => {
    try {
      const response = await axiosInstance.post("/user/login", data);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const verifyEmailToken = async (token: string) => {
  try {
    const response = await axiosInstance.patch("/user", {
      verifyToken: token,
    });
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};
