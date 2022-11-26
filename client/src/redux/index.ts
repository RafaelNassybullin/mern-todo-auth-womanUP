import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { all, fork } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";

import { authReducer } from "./slices/auth-slice";
import { todoReducer } from "./slices/todo-slice";
import {
  loginWatcher,
  registerWatcher,
  refreshTokenWatcher,
  logOutWatcher,
} from "./sagas/auth-saga";
import {
  deleteTodoWatcher,
  getByUserIdWatcher,
  pushScrollWatcher,
  saveTodoWatcher,
  updateTodoWatcher
} from "./sagas/todo-saga";

function* RootSaga() {
  yield all([
    fork(loginWatcher),
    fork(registerWatcher),
    fork(logOutWatcher),
    fork(refreshTokenWatcher),
    fork(pushScrollWatcher),
    fork(updateTodoWatcher),
    fork(getByUserIdWatcher),
    fork(saveTodoWatcher),
    fork(deleteTodoWatcher),
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer
  },
  middleware: [...getDefaultMiddleware(), sagaMiddleware],
  devTools: false,
});

sagaMiddleware.run(RootSaga);

export type RootState = ReturnType<typeof store.getState>