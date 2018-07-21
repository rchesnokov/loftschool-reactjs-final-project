import { fork } from 'redux-saga/effects'
import {
  fetchAccountWatch,
  purchaseCurrencyWatch,
  sellCurrencyWatch,
} from './account/saga'
import { flowAuth } from './auth/saga'
import { fetchCurrenciesWatch, currencyGraphFlow } from './currency/saga'
import { fetchTransactionsWatch } from './transactions/saga'
import { fetchUserInfoWatch } from './user/saga'

export default function*() {
  yield fork(flowAuth)

  yield fork(fetchAccountWatch)
  yield fork(purchaseCurrencyWatch)
  yield fork(sellCurrencyWatch)

  yield fork(fetchCurrenciesWatch)
  yield fork(currencyGraphFlow)

  yield fork(fetchTransactionsWatch)

  yield fork(fetchUserInfoWatch)
}
