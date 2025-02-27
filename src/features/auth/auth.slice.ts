import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  token: string | null;
};

const initialState: AuthState = {
  token: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    deleteToken: state => {
      state.token = null;
    }
  }
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;
