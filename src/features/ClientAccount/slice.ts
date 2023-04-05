import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getJobsActions } from "features/JobDetails/services";
import { GlobalStateStructure } from "lib/globalTypes";
import { RootState } from "store";
import { createJob, getClientJobsActions } from "./services";
import { JobsState, Job } from "./types";

const initialState: GlobalStateStructure<JobsState> = {
  data: { clientJobs: [], jobs: [], editJob: null },
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
    setEditJob: (state, action: PayloadAction<Job>) => {
      state.data.editJob = action.payload;
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
      )
      .addCase(createJob.pending, (state: GlobalStateStructure<JobsState>) => {
        state.loading = true;
      })
      .addCase(
        createJob.fulfilled,
        (state: GlobalStateStructure<JobsState>, { payload }) => {
          state.loading = false;
          state.data.clientJobs = payload.data ?? payload;
          if (payload.error) {
            state.error = true;
          }
        }
      )
      .addCase(
        createJob.rejected,
        (state: GlobalStateStructure<JobsState>, payload: any) => {
          state.loading = false;
          state.error = true;
          state.message = payload.error.message;
        }
      )
      .addCase(
        getJobsActions.pending,
        (state: GlobalStateStructure<JobsState>) => {
          state.loading = true;
        }
      )
      .addCase(
        getJobsActions.fulfilled,
        (state: GlobalStateStructure<JobsState>, { payload }) => {
          state.loading = false;
          state.data.jobs = payload.data ?? payload;
          if (payload.error) {
            state.error = true;
          }
        }
      )
      .addCase(
        getJobsActions.rejected,
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
export const { clientJobsAction, setEditJob } = clientSlice.actions;

// selectors
export const getJobs = (state: RootState) => state.jobs;

export default clientSlice.reducer;
