import { call, put, takeLatest } from 'redux-saga/effects'
import {
  fetchTransactionsRequest,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
} from './actions'
import { getUserTransactions } from 'api/server'

function* fetchTransactions() {
  try {
    const response = yield call(getUserTransactions)
    yield put(fetchTransactionsSuccess(response.data.result))
  } catch (error) {
    yield put(fetchTransactionsFailure(error))
  }
}

export function* fetchTransactionsWatch() {
  yield takeLatest(fetchTransactionsRequest, fetchTransactions)
}
