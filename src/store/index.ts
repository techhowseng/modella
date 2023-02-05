import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "features/Auth/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
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
