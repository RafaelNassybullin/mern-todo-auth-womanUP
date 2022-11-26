import { AxiosResponse } from "axios";
import { put, call, takeLatest, PutEffect, CallEffect } from "redux-saga/effects";
import {
  getByUserIdTodoPage_API,
  deleteByUserIdTodo_API,
  saveByUserIdTodo_API,
  updateByUserIdTodo_API,
  getByUserIdTodoAll_API
} from "../../api/todo-crud-api";
import { GetIdFromJWT } from "../../functions";
import { SaveTypes, TodoTypes } from "../../interfaces/todo-types";
import {
  deleteTodoError,
  deleteTodoSuccess,
  getTodoById_PageError,
  getTodoById_PageSuccess,
  pushScrollError,
  pushScrollSuccess,
  saveTodoError,
  saveTodoSuccess,
  updateTodoError,
  updateTodoSuccess
} from "../slices/todo-slice";

function* pushScrollWorker({ payload }: { type: string, payload: { page: number } }): Generator<PutEffect | CallEffect | Promise<string | null>, void, AxiosResponse<TodoTypes>> {
  try {
    const userID: string | any = yield GetIdFromJWT();
    const page: number | any = payload
    const response: AxiosResponse<TodoTypes> = yield call(getByUserIdTodoPage_API, { page, userID });
    if (response.status === 200) {
      yield put(pushScrollSuccess(response.data));
    }
  } catch (error) {
    yield put(pushScrollError());
  }
}

function* getByUserIdPageWorker(): Generator<PutEffect | CallEffect | Promise<string | null>, void, AxiosResponse<TodoTypes[]>> {
  try {
    const userId: string | any = yield GetIdFromJWT();
    const responce: AxiosResponse<TodoTypes[]> = yield call(getByUserIdTodoAll_API, userId);
    if (responce.status === 200) {
      yield put(getTodoById_PageSuccess(responce.data));
    }
  } catch (error) {
    yield put(getTodoById_PageError());
  }
}

function* updateTodoWorker({ payload }: { type: string, payload: TodoTypes }): Generator<PutEffect | CallEffect, void, AxiosResponse<TodoTypes>> {
  try {
    const responce: AxiosResponse<TodoTypes> = yield call(updateByUserIdTodo_API, payload);
    if (responce.status === 200) {
      yield put(updateTodoSuccess(responce.data));
    }
  } catch (error) {
    yield put(updateTodoError());
  }
}

function* deleteTodoWorker({ payload }: { type: string, payload: { id: string } }): Generator<PutEffect | CallEffect, void> {
  try {
    yield call(deleteByUserIdTodo_API, payload.id);
    yield put(deleteTodoSuccess());
  } catch (error) {
    yield put(deleteTodoError());
  }
}

function* saveTodoWorker({ payload }: { type: string, payload: SaveTypes }): Generator<PutEffect | CallEffect | Promise<string | null>, void, AxiosResponse<TodoTypes>> {
  try {
    const userID: string | any = yield GetIdFromJWT();
    const responce: AxiosResponse<TodoTypes> = yield call(saveByUserIdTodo_API, { ...payload, userID });
    if (responce.status === 201) {
      const data = responce.data
      yield put(saveTodoSuccess(data));
    }
  } catch (error) {
    yield put(saveTodoError());
  }
}

export function* pushScrollWatcher() {
  yield takeLatest("todo/pushScrollData", pushScrollWorker);
}

export function* saveTodoWatcher() {
  yield takeLatest("todo/saveTodoStart", saveTodoWorker);
}

export function* getByUserIdWatcher() {
  yield takeLatest("todo/getDataById_PageStart", getByUserIdPageWorker);
}

export function* updateTodoWatcher() {
  yield takeLatest("todo/updateTodoStart", updateTodoWorker);
}

export function* deleteTodoWatcher() {
  yield takeLatest("todo/deleteTodoStart", deleteTodoWorker);
}