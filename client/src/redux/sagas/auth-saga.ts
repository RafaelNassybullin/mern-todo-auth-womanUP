import { AxiosResponse } from "axios";
import { put, call, takeLatest, PutEffect, CallEffect } from "redux-saga/effects";
import { loginApi, refreshTokenApi, registerApi, logOutApi } from "../../api/auth-api";
import { Login, Tokens, Register, LogOut } from "../../interfaces/auth-types";
import {
  loginSuccess,
  loginError,
  refreshSuccess,
  refreshError,
  logoutSuccess,
  logoutError,
  registerSuccess,
  registerError
} from "../slices/auth-slice";

function* loginWorker({ payload }: { type: string, payload: Login }): Generator<PutEffect | CallEffect, void, AxiosResponse<Tokens>> {
  try {
    const response: AxiosResponse<Tokens> = yield call(loginApi, payload);
    if (response.status === 200) {
      const data = response.data
      yield put(loginSuccess(data));
    }
  } catch (error) {
    yield put(loginError());
  }
}

function* registerWorker({ payload }: { type: string, payload: Register }): Generator<PutEffect | CallEffect, void, AxiosResponse<Tokens>> {
  try {
    const response: AxiosResponse<Tokens> = yield call(registerApi, payload);
    if (response.status === 200) {
      const data = response.data
      yield put(registerSuccess(data));
    }
  } catch (error) {
    yield put(registerError());
  }
}

function* logoutWorker(): Generator<PutEffect | CallEffect, void, AxiosResponse<LogOut>> {
  try {
    const response: AxiosResponse<LogOut> = yield call(logOutApi);
    if (response.status === 200) {
      yield put(logoutSuccess());
    }
  } catch (error) {
    yield put(logoutError());
  }
}

function* refreshTokenWorker(): Generator<PutEffect | CallEffect, void, AxiosResponse<Tokens>> {
  try {
    const response: AxiosResponse<Tokens> = yield call(refreshTokenApi);
    if (response.status === 200) {
      yield put(refreshSuccess(response.data));
    }
  } catch (error) {
    yield put(refreshError());
  }
}

export function* loginWatcher() {
  yield takeLatest("auth/loginStart", loginWorker);
}

export function* registerWatcher() {
  yield takeLatest("auth/registerStart", registerWorker);
}

export function* logOutWatcher() {
  yield takeLatest("auth/logoutStart", logoutWorker);
}

export function* refreshTokenWatcher() {
  yield takeLatest("auth/refreshStart", refreshTokenWorker);
}