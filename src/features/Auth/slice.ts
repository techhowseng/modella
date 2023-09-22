import { User } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";
import { updateModel } from "features/BioData/services";
import {
  getUser,
  getUserMediaAction,
  updateThumbnailAction,
} from "features/ModelAccount/services";
import { deleteCookie } from "helper/cookie";
import { SESSION_NAME } from "lib/constants";
import { getStatesList } from "lib/getCountries";
import { RootState } from "store";
import {
  registerUser,
  createModel,
  deleteSession,
  createSession,
  createClient,
  updateClient,
} from "./services";
import { UserState } from "./types";

const initialState: UserState = {
  data: { user: {}, MediaList: [], selectedCountryOption: "", stateList: [] },
  loading: false,
  profileImageLoading: false,
  error: false,
  message: "",
};

export const userSlice = createSlice({
  reducers: {
    registerSessionUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.data.user = user;
    },
    updateSelectedCountryOption: (state, action: PayloadAction<string>) => {
      const countryId = action.payload;
      state.data.selectedCountryOption = countryId;
      state.data.stateList = getStatesList(countryId);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateMediaList: (state, action: PayloadAction<{}>) => {
      state.data.MediaList = [...state.data.MediaList, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSession.fulfilled, (state, { payload }) => {
        // When the API call is successful and we get some data,the data becomes the `fulfilled` action payload
        state.loading = false;
        state.data.user = payload.data ?? payload;
        setCookie(SESSION_NAME, JSON.stringify(payload.data), {
          maxAge: 60 * 60 * 24,
        });
        state.message = payload.message;
        if (payload.error) {
          state.error = true;
        }
      })
      .addCase(createSession.rejected, (state, payload) => {
        state.loading = false;
        state.error = true;
        state.message = payload.error.message;
      })
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
      .addCase(createModel.pending, (state) => {
        state.loading = true;
      })
      .addCase(createModel.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data.user = { ...state.data.user, ...payload };
      })
      .addCase(createModel.rejected, (state, payload) => {
        state.loading = false;
        state.error = true;
        state.message = payload.error.message;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data.user = { ...state.data.user, ...payload };
      })
      .addCase(getUser.rejected, (state, payload) => {
        state.loading = false;
        state.error = true;
        state.message = payload.error.message;
      })
      .addCase(createClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(createClient.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data.user = { ...state.data.user, ...payload };
      })
      .addCase(createClient.rejected, (state, payload) => {
        state.loading = false;
        state.error = true;
        state.message = payload.error.message;
      })
      .addCase(updateClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateClient.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data.user = { ...state.data.user, ...payload };
      })
      .addCase(updateClient.rejected, (state, payload) => {
        state.loading = false;
        state.error = true;
        state.message = payload.error.message;
      })
      .addCase(updateModel.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateModel.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data.user = { ...state.data.user, ...payload };
      })
      .addCase(updateModel.rejected, (state, payload) => {
        state.loading = false;
        state.error = true;
        state.message = payload.error.message;
      })
      .addCase(deleteSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSession.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data.user = {};
        deleteCookie(SESSION_NAME);
        location.reload();
      })
      .addCase(deleteSession.rejected, (state, payload) => {
        state.loading = false;
        state.error = true;
        state.message = payload.error.message;
      })
      .addCase(getUserMediaAction.pending, (state, payload) => {
        state.loading = true;
      })
      .addCase(getUserMediaAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data.MediaList = payload;
      })
      .addCase(getUserMediaAction.rejected, (state, payload) => {
        state.loading = false;
        state.error = true;
        state.message = payload.error.message;
      })
      .addCase(updateThumbnailAction.pending, (state, payload) => {
        state.profileImageLoading = true;
      })
      .addCase(updateThumbnailAction.fulfilled, (state, { payload }) => {
        state.profileImageLoading = false;
        state.data.user = payload;
      })
      .addCase(updateThumbnailAction.rejected, (state, payload) => {
        state.profileImageLoading = false;
        state.error = true;
        state.message = payload.error.message;
      });
  },
  name: "user",
  initialState,
});

// actions
export const {
  registerSessionUser,
  updateSelectedCountryOption,
  setLoading,
  updateMediaList,
} = userSlice.actions;

// selectors
export const getSessionUser = (state: RootState) => state.auth;
export const getStateList = ({ auth }: RootState) => auth.data.stateList;

export default userSlice.reducer;
