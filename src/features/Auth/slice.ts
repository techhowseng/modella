import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
import { User, UserState } from "./types";

const initialState: UserState = {
  user: [{ id: "1", heading: "Todo for the day", content: "" }],
};

export const userSlice = createSlice({
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user.push(user);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const updateduser = state.user.filter((eachUser) => eachUser.id !== id);
      state.user = updateduser;
    },
  },
  name: "user",
  initialState,
});

// actions
export const { addUser, removeUser } = userSlice.actions;

// selectors
export const getAuthUser = (state: RootState) => state.auth.user;

export default userSlice.reducer;
