import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import dashboardLayoutSlice from "slices/dashboard-layout";
import profileMenuSlice from "slices/profile-menu";

const makeStore = () =>
  configureStore({
    reducer: {
      [dashboardLayoutSlice.name]: dashboardLayoutSlice.reducer,
      [profileMenuSlice.name]: profileMenuSlice.reducer,
    },
    devTools: process.env.NODE_ENV === "development",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
