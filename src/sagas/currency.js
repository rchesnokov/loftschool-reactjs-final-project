import { call, put, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { candles } from 'api/server'
import {
  fetchBtcRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthRequest,
  fetchEthSuccess,
  fetchEthFailure,
} from 'ducks/currency'

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

export function* currencyGraphFlow() {
  while (true) {
    // const offset = yield select(getOffset)
    yield put(fetchBtcRequest('1h'))
    yield put(fetchEthRequest('1h'))

    yield delay(15000)
  }
}
