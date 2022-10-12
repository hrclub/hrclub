import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "lib/redux";
import { HYDRATE } from "next-redux-wrapper";

interface DashboardLayoutState {
  open: boolean;
  width: number;
}

const initialState: DashboardLayoutState = {
  open: false,
  width: 240,
};

const dashboardLayoutSlice = createSlice({
  name: "dashboard-layout",
  initialState,
  reducers: {
    toggleDashboardLayoutOpen(state) {
      state.open = !state.open;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({ ...state, ...action.payload.auth }),
  },
});

export const { toggleDashboardLayoutOpen } = dashboardLayoutSlice.actions;
export const selectDashboardLayoutOpen = () => (state: AppState) =>
  state[dashboardLayoutSlice.name].open;
export const selectDashboardLayoutWidth = () => (state: AppState) =>
  state[dashboardLayoutSlice.name].width;
export default dashboardLayoutSlice;
