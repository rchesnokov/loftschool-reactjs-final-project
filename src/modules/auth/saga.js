import { call, put, take } from 'redux-saga/effects'
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

export function* authorize(email, password) {
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

export function* register(email, password) {
  try {
    const response = yield call(registration, { email, password })
    const token = response.data.jwt
    yield call(setTokenToLocalStorage, token)
    yield call(setTokenApi, token)
    yield put(registerSuccess())
  } catch (error) {
    let message
    if (error.data.message.email) {
      message = `Email ${error.data.message.email}`
    } else if (error.data.message.password) {
      message = `Password ${error.data.message.password}`
    } else {
      message = error.data.message
    }

    yield put(registerFailure(message))
  }
}

export function* flowAuth() {
  while (true) {
    let token = yield call(getTokenFromLocalStorage)

    if (token != null) {
      yield call(setTokenApi, token)
      yield put(loginSuccess())
    } else {
      const action = yield take([loginRequest, registerRequest])
      const { email, password } = action.payload
      const handler =
        action.type === loginRequest.toString() ? authorize : register
      token = yield call(handler, email, password)
    }

    if (token) {
      yield take(logout)

      yield call(removeTokenFromLocalStorage)
      yield call(clearTokenApi)
    }
  }
}
