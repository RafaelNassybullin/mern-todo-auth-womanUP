import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../";

const data = (state: RootState) => state.todo.todoData;
export const dataReselect = createSelector(data, (items) => {
  return items
});

const allData = (state: RootState) => state.todo.allData;
export const allDataReselect = createSelector(allData, (items) => {
  return items
});

const todoLoader = (state: RootState) => state.todo.todoLoader;
export const todoLoaderReselect = createSelector(todoLoader, (loader) => {
  return loader;
});

const isFetchSelector = (state: RootState) => state.todo.isFetching;
export const isFetch = createSelector(isFetchSelector, (data) => {
  return data;
});

const pageSelector = (state: RootState) => state.todo.page;
export const pages = createSelector(pageSelector, (data) => {
  return data;
});

const dataCount = (state: RootState) => state.todo.dataCount;
export const dataCountReselect = createSelector(dataCount, (data) => {
  return data;
});
