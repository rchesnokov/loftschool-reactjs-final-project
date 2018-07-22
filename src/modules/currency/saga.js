// prettier-ignore
import { call, cancel, fork, put, race, select, take, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { candles } from 'api/server'
import {
  fetchBtcRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthRequest,
  fetchEthSuccess,
  fetchEthFailure,
  selectOffset,
} from './actions'
import { getOffset } from './selectors'
import { loginSuccess, logout } from '../auth/index'

function* fetchBtc({ payload }) {
  try {
    const response = yield call(candles, 'btc', payload)
    yield put(fetchBtcSuccess(response.data.result))
  } catch (error) {
    yield put(fetchBtcFailure(error.toString()))
  }
}

function* fetchEth({ payload }) {
  try {
    const response = yield call(candles, 'eth', payload)
    yield put(fetchEthSuccess(response.data.result))
  } catch (error) {
    yield put(fetchEthFailure(error.toString()))
  }
}

export function* fetchCurrenciesWatch() {
  yield takeLatest(fetchBtcRequest, fetchBtc)
  yield takeLatest(fetchEthRequest, fetchEth)
}

export function* currencyFlow() {
  while (true) {
    const offset = yield select(getOffset)
    yield put(fetchBtcRequest(offset))
    yield put(fetchEthRequest(offset))

    yield race([delay(20000), take(selectOffset)])
  }
}

export function* currencyWatch() {
  let task
  while (true) {
    yield take(loginSuccess)
    task = yield fork(currencyFlow)
    yield take(logout)
    yield cancel(task)
  }
}
