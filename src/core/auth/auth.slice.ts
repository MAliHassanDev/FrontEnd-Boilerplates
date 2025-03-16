import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  token?: string;
  roles?: number[];
};

const initialState: AuthState = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.roles = action.payload.roles;
    },
  },
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;
