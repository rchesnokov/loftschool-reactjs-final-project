import { call, put, take, takeLatest } from 'redux-saga/effects'
import { setTokenApi, clearTokenApi, login, registration } from 'api/server'
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage,
} from 'api/localStorage'
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logout,
} from './actions'
import { fetchUserRequest } from 'modules/user'
import { fetchAccountRequest } from 'modules/account'

function* authorize(email, password) {
  try {
    const response = yield call(login, { email, password })
    const token = response.data.jwt
    yield call(setTokenToLocalStorage, token)
    yield call(setTokenApi, token)
    yield put(loginSuccess())
    return token
  } catch (error) {
    yield put(loginFailure(error.data.message))
  }
}

function* register(action) {
  const { email, password } = action.payload
  try {
    const response = yield call(registration, { email, password })
    const token = response.jwt
    yield call(setTokenToLocalStorage, token)
    yield call(setTokenApi, token)
    yield put(registerSuccess())
  } catch (error) {
    yield put(registerFailure(error.data.message))
  }
}

export function* flowAuth() {
  while (true) {
    let token = yield call(getTokenFromLocalStorage)

    if (token != null) {
      yield call(setTokenApi, token)
      yield put(loginSuccess())
    } else {
      const action = yield take(loginRequest)
      const { email, password } = action.payload
      token = yield call(authorize, email, password)
    }

    if (token) {
      yield put(fetchUserRequest())
      yield put(fetchAccountRequest())

      yield take(logout)

      yield call(removeTokenFromLocalStorage)
      yield call(clearTokenApi)
    }
  }
}

export function* watchRegister() {
  yield takeLatest(registerRequest, register)
}
