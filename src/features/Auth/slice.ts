import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
import { registerUser } from "./services";
import { User, UserState } from "./types";

const initialState: UserState = {
  data: { user: {} },
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  reducers: {
    // registerUser: (state, action: PayloadAction<User>) => {
    //   console.log('action.payload: ', action.payload);
    //   const user = action.payload;
    //   state.data.user = user;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        // When the API call is successful and we get some data,the data becomes the `fulfilled` action payload
        state.loading = false;
        state.data = payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
  name: "user",
  initialState,
});

// actions
// export const { registerUser } = userSlice.actions;

// selectors
export const getAuthUser = (state: RootState) => state.auth;

export default userSlice.reducer;
