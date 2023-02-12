import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
import { registerUser, updateUser } from "./services";
import { User, UserState } from "./types";

const initialState: UserState = {
  data: { user: {} },
  loading: false,
  error: false,
  message: "",
};

export const userSlice = createSlice({
  reducers: {
    registerSessionUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.data.user = user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        // When the API call is successful and we get some data,the data becomes the `fulfilled` action payload
        state.loading = false;
        state.data.user = payload.data;
        state.message = payload.message;
        if (payload.error) {
          state.error = true;
        }
      })
      .addCase(registerUser.rejected, (state, payload) => {
        state.loading = false;
        state.error = true;
        state.message = payload.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data.user = { ...state.data.user, ...payload };
        console.log("payload >>>> ", payload);
      })
      .addCase(updateUser.rejected, (state, payload) => {
        state.loading = false;
        state.error = true;
        state.message = payload.error.message;
      });
  },
  name: "user",
  initialState,
});

// actions
export const { registerSessionUser } = userSlice.actions;

// selectors
export const getSessionUser = (state: RootState) => state.auth;

export default userSlice.reducer;
