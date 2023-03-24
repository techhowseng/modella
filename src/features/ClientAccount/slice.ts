import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalStateStructure } from "lib/globalTypes";
import { RootState } from "store";
import { getClientJobsActions } from "./services";
import { JobsState, Job } from "./types";

const initialState: GlobalStateStructure<JobsState> = {
  data: { clientJobs: [], jobs: [] },
  loading: false,
  error: false,
  message: "",
};

export const clientSlice = createSlice({
  reducers: {
    clientJobsAction: (state, action: PayloadAction<Job[]>) => {
      const clientJobs = action.payload;
      state.data.clientJobs = clientJobs;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getClientJobsActions.pending,
        (state: GlobalStateStructure<JobsState>) => {
          state.loading = true;
        }
      )
      .addCase(
        getClientJobsActions.fulfilled,
        (state: GlobalStateStructure<JobsState>, { payload }) => {
          state.loading = false;
          state.data.clientJobs = payload.data ?? payload;
          if (payload.error) {
            state.error = true;
          }
        }
      )
      .addCase(
        getClientJobsActions.rejected,
        (state: GlobalStateStructure<JobsState>, payload: any) => {
          state.loading = false;
          state.error = true;
          state.message = payload.error.message;
        }
      );
  },
  name: "jobs",
  initialState,
});

// actions
export const { clientJobsAction } = clientSlice.actions;

// selectors
export const getJobs = (state: RootState) => state.jobs;

export default clientSlice.reducer;
