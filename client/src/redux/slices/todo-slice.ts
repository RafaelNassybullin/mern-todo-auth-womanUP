import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { unique } from "../../functions";
import { TodoState, TodoTypes } from "../../interfaces/todo-types";

const todoState: TodoState = {
  todoLoader: false,
  todoData: [],
  allData: [],
  todoError: false,
  page: 1,
  isFetching: true,
  dataCount: 80,
  paginateError: false
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: todoState,
  reducers: {
    pushScrollData: (state, _: PayloadAction<number>) => {
      state.todoLoader = true;
      state.paginateError = false
    },
    pushScrollSuccess: (state, action) => {
      state.dataCount = action.payload.totalDocs;
      const uniqArr = [...state.todoData, ...action.payload.docs]
      state.todoData = unique(uniqArr)
      state.isFetching = false;
      state.page = state.page + 1;
      state.todoLoader = false;
    },
    pushScrollError: (state) => {
      state.todoLoader = false;
      state.paginateError = true;
    },
    pushIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    saveTodoStart: (state, _: PayloadAction<{ title: string, description: string }>) => {
      state.todoError = false;
    },
    saveTodoSuccess: (state, action: PayloadAction<TodoTypes>) => {
      state.todoData.unshift(action.payload)
      state.allData.unshift(action.payload)
      state.todoError = false;
    },
    saveTodoError: (state) => {
      state.todoError = true;
    },
    getDataById_PageStart: (state) => {
      state.todoLoader = true;
      state.todoError = false;
    },
    getTodoById_PageSuccess: (state, action: PayloadAction<TodoTypes[]>) => {
      state.allData = action.payload
      state.todoLoader = false;
      state.todoError = false;
    },
    getTodoById_PageError: (state) => {
      state.todoError = true;
      state.todoLoader = false;
    },

    updateTodoStart: (state, _: PayloadAction<TodoTypes>) => {
      state.todoError = false;
    },
    updateTodoSuccess: (state, action: PayloadAction<TodoTypes>) => {
      state.todoData = state.todoData.map((item: TodoTypes) => item._id === action.payload._id ? action.payload : item)
      state.allData = state.allData.map((item: TodoTypes) => item._id === action.payload._id ? action.payload : item)
      state.todoError = false;
    },
    updateTodoError: (state) => {
      state.todoError = true;
    },
    deleteTodoStart: (state, action: PayloadAction<{ id: string }>) => {
      state.todoData = state.todoData.filter((todo: TodoTypes) => todo._id !== action.payload.id)
      state.allData = state.allData.filter((todo: TodoTypes) => todo._id !== action.payload.id)
      state.todoError = false;
    },
    deleteTodoSuccess: (state) => {
      state.todoError = false;
    },
    deleteTodoError: (state) => {
      state.todoError = true;
    },
    resetTodoState: () => todoState
  },
});

export const {
  pushScrollData,
  pushScrollSuccess,
  pushScrollError,
  pushIsFetching,

  saveTodoStart,
  saveTodoSuccess,
  saveTodoError,

  getDataById_PageStart,
  getTodoById_PageSuccess,
  getTodoById_PageError,

  updateTodoStart,
  updateTodoSuccess,
  updateTodoError,

  deleteTodoStart,
  deleteTodoSuccess,
  deleteTodoError,

  resetTodoState,
} = todoSlice.actions;

export const todoReducer = todoSlice.reducer;
