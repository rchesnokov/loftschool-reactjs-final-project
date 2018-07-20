import { fork } from 'redux-saga/effects'
import { flowAuth } from './auth/saga'
import { fetchCurrenciesWatch, currencyGraphFlow } from './currency/saga'

export default function* () {
  yield fork(flowAuth)
  yield fork(fetchCurrenciesWatch)
  yield fork(currencyGraphFlow)
}
