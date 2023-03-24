import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalStateStructure } from "lib/globalTypes";
import { RootState } from "store";
import { getClientJobsActions } from "./services";
import { ClientJobsState, Jobs } from "./types";

const initialState: GlobalStateStructure<ClientJobsState> = {
  data: { clientJobs: [] },
  loading: false,
  error: false,
  message: "",
};

export const clientSlice = createSlice({
  reducers: {
    clientJobsAction: (state, action: PayloadAction<Jobs[]>) => {
      const clientJobs = action.payload;
      state.data.clientJobs = clientJobs;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getClientJobsActions.pending,
        (state: GlobalStateStructure<ClientJobsState>) => {
          state.loading = true;
        }
      )
      .addCase(
        getClientJobsActions.fulfilled,
        (state: GlobalStateStructure<ClientJobsState>, { payload }) => {
          state.loading = false;
          state.data.clientJobs = payload.data ?? payload;
          if (payload.error) {
            state.error = true;
          }
        }
      )
      .addCase(
        getClientJobsActions.rejected,
        (state: GlobalStateStructure<ClientJobsState>, payload: any) => {
          state.loading = false;
          state.error = true;
          state.message = payload.error.message;
        }
      );
  },
  name: "clientJobs",
  initialState,
});

// actions
export const { clientJobsAction } = clientSlice.actions;

// selectors
export const getClientJobs = (state: RootState) => state.clientJobs;

export default clientSlice.reducer;
