import { fork } from 'redux-saga/effects'
import { fetchAccountWatch } from './account/saga'
import { flowAuth } from './auth/saga'
import { fetchCurrenciesWatch, currencyGraphFlow } from './currency/saga'
import { fetchUserInfoWatch } from './user/saga'

export default function*() {
  yield fork(flowAuth)
  yield fork(fetchCurrenciesWatch)
  yield fork(fetchUserInfoWatch)
  yield fork(fetchAccountWatch)
  yield fork(currencyGraphFlow)
}
