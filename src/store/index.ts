import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "features/Auth/slice";
import jobsReducer from "features/ClientAccount/slice";
import jobReducer from "features/JobDetails/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    job: jobReducer,
  },
});

// create types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
