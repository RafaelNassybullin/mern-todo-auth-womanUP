import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../";

const isAuth = (state: RootState) => state.auth.isAuth;
export const isAuthReselect = createSelector(isAuth, (bool) => {
  return bool;
});

const loading = (state: RootState) => state.auth.isLoading;
export const loadingReselect = createSelector(loading, (load) => {
  return load
});

const error = (state: RootState) => state.auth.error;
export const errorReselect = createSelector(error, (load) => {
  return load
});










