import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import kanyeReducer from "features/Auth/kanyeSlice";
import authReducer from "features/Auth/slice";

export const store = configureStore({
  reducer: {
    // reference reducers here
    auth: authReducer,
    kanyeQuote: kanyeReducer,
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
