import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "lib/axiosInstance";
import { errorHandler } from "lib/errorhandler";
import {
  AuthRegistrationCompleteFormType,
  AuthRegistrationFormType,
  ClientRegistrationCompleteFormType,
  LoginSessionType,
} from "./types";

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

export const getUserDetails = createAsyncThunk(
  "get/user",
  async () => {
    try {
      const response = await axiosInstance.get("/session");
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const createSession = createAsyncThunk(
  "create/user/session",
  async (data: LoginSessionType) => {
    try {
      const response = await axiosInstance.post("/session", data);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const deleteSession = createAsyncThunk(
  "remove/user/session",
  async () => {
    try {
      const response = await axiosInstance.delete("/session");
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const createModel = createAsyncThunk(
  "register/user/model",
  async (data: AuthRegistrationCompleteFormType) => {
    try {
      const response = await axiosInstance.post("/model", data);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const createClient = createAsyncThunk(
  "register/user/client",
  async (data: ClientRegistrationCompleteFormType) => {
    try {
      const response = await axiosInstance.post("/client", data);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const updateClient = createAsyncThunk(
  "update/user/client",
  async ({
    data,
    id,
  }: {
    data: ClientRegistrationCompleteFormType;
    id: string;
  }) => {
    try {
      const response = await axiosInstance.put(`/client/${id}`, data);
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
