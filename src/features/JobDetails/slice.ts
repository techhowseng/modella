import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Job, JobsState } from "features/ClientAccount/types";
import { GlobalStateStructure } from "lib/globalTypes";
import { RootState } from "store";
import { applyToJobAction, getJobAction } from "./services";

const initialState: GlobalStateStructure<JobsState> = {
  data: { job: null, isApplying: false },
  loading: false,
  error: false,
  message: "",
};

export const jobDetailSlice = createSlice({
  reducers: {
    singleJobAction: (state, action: PayloadAction<Job>) => {
      const job = action.payload;
      state.data.job = job;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getJobAction.pending,
        (state: GlobalStateStructure<JobsState>) => {
          state.loading = true;
        }
      )
      .addCase(
        getJobAction.fulfilled,
        (state: GlobalStateStructure<JobsState>, { payload }) => {
          state.loading = false;
          state.data.job = payload.data ?? payload;
          if (payload.error) {
            state.error = true;
          }
        }
      )
      .addCase(
        getJobAction.rejected,
        (state: GlobalStateStructure<JobsState>, payload: any) => {
          state.loading = false;
          state.error = true;
          state.message = payload.error.message;
        }
      )
      .addCase(
        applyToJobAction.pending,
        (state: GlobalStateStructure<JobsState>) => {
          state.data.isApplying = true;
        }
      )
      .addCase(
        applyToJobAction.fulfilled,
        (state: GlobalStateStructure<JobsState>, { payload }) => {
          state.data.isApplying = false;
          state.data.job = payload.data ?? payload;
          if (payload.error) {
            state.error = true;
          }
        }
      )
      .addCase(
        applyToJobAction.rejected,
        (state: GlobalStateStructure<JobsState>, payload: any) => {
          state.data.isApplying = false;
          state.error = true;
          state.message = payload.error.message;
        }
      );
  },
  name: "job",
  initialState,
});

// actions
export const { singleJobAction } = jobDetailSlice.actions;

// selectors
export const getJob = (state: RootState) => state.job;

export default jobDetailSlice.reducer;
