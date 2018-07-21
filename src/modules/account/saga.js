import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  fetchAccountRequest,
  fetchAccountSuccess,
  fetchAccountFailure,
  purchaseCurrencyRequest,
  purchaseCurrencySuccess,
  purchaseCurrencyFailure,
  sellCurrencyRequest,
  sellCurrencySuccess,
  sellCurrencyFailure,
} from './actions'
import { getSelected as getSelectedCurrency } from 'modules/currency'
import { getWallet, buyCurrency, sellCurrency } from 'api/server'

function* fetchAccount() {
  try {
    const response = yield call(getWallet)
    yield put(fetchAccountSuccess(response.data.result))
  } catch (error) {
    yield put(fetchAccountFailure(error))
  }
}

function* purchaseCurrency(action) {
  try {
    const selectedCurrency = yield select(getSelectedCurrency)
    const value = action.payload
    const response = yield call(buyCurrency, selectedCurrency, value)
    yield put(purchaseCurrencySuccess(response.data))
  } catch (error) {
    yield put(purchaseCurrencyFailure(error))
  }
}

function* sellCurrencySaga(action) {
  try {
    const selectedCurrency = yield select(getSelectedCurrency)
    const value = action.payload
    const response = yield call(sellCurrency, selectedCurrency, value)
    yield put(sellCurrencySuccess(response.data))
  } catch (error) {
    yield put(sellCurrencyFailure(error))
  }
}

export function* fetchAccountWatch() {
  yield takeLatest(fetchAccountRequest, fetchAccount)
}

export function* purchaseCurrencyWatch() {
  yield takeLatest(purchaseCurrencyRequest, purchaseCurrency)
}

export function* sellCurrencyWatch() {
  yield takeLatest(sellCurrencyRequest, sellCurrencySaga)
}
