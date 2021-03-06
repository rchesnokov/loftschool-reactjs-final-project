import { fork } from 'redux-saga/effects'
import {
  fetchAccountWatch,
  fetchAccountOnLoginWatch,
  purchaseCurrencyWatch,
  sellCurrencyWatch,
} from './account/saga'
import { flowAuth } from './auth/saga'
import { currencyWatch, fetchCurrenciesWatch } from './currency/saga'
import { fetchTransactionsWatch } from './transactions/saga'
import { fetchUserInfoWatch, fetchUserInfoOnLogin } from './user/saga'

export default function*() {
  yield fork(flowAuth)

  yield fork(fetchAccountWatch)
  yield fork(fetchAccountOnLoginWatch)
  yield fork(purchaseCurrencyWatch)
  yield fork(sellCurrencyWatch)

  yield fork(currencyWatch)
  yield fork(fetchCurrenciesWatch)

  yield fork(fetchTransactionsWatch)

  yield fork(fetchUserInfoWatch)
  yield fork(fetchUserInfoOnLogin)
}
