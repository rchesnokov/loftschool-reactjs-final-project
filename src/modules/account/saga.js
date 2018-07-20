import { call, put, takeLatest } from 'redux-saga/effects'
import {
  fetchAccountRequest,
  fetchAccountSuccess,
  fetchAccountFailure,
} from './actions'
import { getWallet } from 'api/server'

function* fetchAccount() {
  try {
    const response = yield call(getWallet)
    yield put(fetchAccountSuccess(response.data.result))
  } catch (error) {
    yield put(fetchAccountFailure(error))
  }
}

export function* fetchAccountWatch() {
  yield takeLatest(fetchAccountRequest, fetchAccount)
}
