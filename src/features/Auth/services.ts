import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "lib/axiosInstance";
import { AuthRegistrationFormType } from "./types";

// This action is what we will call using the dispatch in order to trigger the API call.
export const registerUser = createAsyncThunk(
  "register/user",
  async (data: AuthRegistrationFormType) => {
    try {
      const response = await axiosInstance.post("/api/user", data);
      return response.data;
    } catch (error) {
      return { ...error.response.data, error: true };
    }
  }
);
