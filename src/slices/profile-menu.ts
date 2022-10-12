import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "lib/redux";
import { HYDRATE } from "next-redux-wrapper";

interface ProfileMenuState {
  open: boolean;
  x: number;
  y: number;
}

const initialState: ProfileMenuState = {
  x: 0,
  y: 0,
  open: false,
};

const profileMenuSlice = createSlice({
  name: "profile-menu",
  initialState,
  reducers: {
    setOpenProfileMenu(
      state,
      action: PayloadAction<Omit<ProfileMenuState, "open">>
    ) {
      state.x = action.payload.x;
      state.y = action.payload.y + 20;
      state.open = true;
    },
    setCloseProfileMenu(state) {
      state.open = false;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({ ...state, ...action.payload.auth }),
  },
});

export const { setOpenProfileMenu, setCloseProfileMenu } =
  profileMenuSlice.actions;
export const selectProfileMenuOpen = () => (state: AppState) =>
  state[profileMenuSlice.name].open;
export const selectProfileMenuPosition = () => (state: AppState) => ({
  x: state["profile-menu"].x,
  y: state["profile-menu"].y,
});
export default profileMenuSlice;
