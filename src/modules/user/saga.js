import { call, put, takeLatest } from 'redux-saga/effects'
import { getUserInfo } from 'api/server'
import { fetchUserRequest, fetchUserSuccess, fetchUserFailure } from './actions'
import { loginSuccess, registerSuccess } from 'modules/auth/actions'

function* fetchUser() {
  try {
    const response = yield call(getUserInfo)
    yield put(fetchUserSuccess(response.data.result))
  } catch (error) {
    yield put(fetchUserFailure(error))
  }
}

export function* fetchUserInfoWatch() {
  yield takeLatest(fetchUserRequest, fetchUser)
}

export function* fetchUserInfoOnLogin() {
  yield takeLatest(loginSuccess, fetchUser)
  yield takeLatest(registerSuccess, fetchUser)
}
