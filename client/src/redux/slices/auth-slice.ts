import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

interface IAuthState {
  isAuth: boolean,
  isLoading: boolean,
  error: boolean,
}

const authState: IAuthState = {
  isAuth: false,
  isLoading: false,
  error: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    loginStart: (state, _: PayloadAction<{ email: string, password: string }>) => {
      state.isLoading = true;
      state.error = false;
    },
    loginSuccess: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.isAuth = true;
      Cookies.set("accessToken", action.payload.accessToken);
      state.isLoading = false;
    },
    loginError: (state) => {
      state.error = true;
      state.isLoading = false;
    },
    registerStart: (state, _: PayloadAction<{ name: string, email: string, password: string }>) => {
      state.isLoading = true;
      state.error = false;
    },
    registerSuccess: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.isAuth = true;
      Cookies.set("accessToken", action.payload.accessToken);
      state.isLoading = false;
    },
    registerError: (state) => {
      state.error = true;
      state.isLoading = false;
    },
    logoutStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      Cookies.remove("accessToken");
      state.isAuth = false;
    },
    logoutError: (state) => {
      state.error = true;
      state.isLoading = false;
    },
    refreshStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    refreshSuccess: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.isAuth = true;
      Cookies.set("accessToken", action.payload.accessToken);
      state.isLoading = false;
    },
    refreshError: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    errorDestroyer: (state) => {
      state.error = false;
    },
    resetAuthState: () => authState
  },
});

export const {
  loginStart,
  loginSuccess,
  loginError,

  registerStart,
  registerSuccess,
  registerError,

  logoutStart,
  logoutSuccess,
  logoutError,

  refreshStart,
  refreshSuccess,
  refreshError,

  errorDestroyer,
  resetAuthState,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
