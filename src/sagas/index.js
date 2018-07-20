import { fork } from 'redux-saga/effects'
import { flowAuth } from './auth'
import { fetchCurrenciesWatch, currencyGraphFlow } from './currency'

export default function*() {
  yield fork(flowAuth)
  yield fork(fetchCurrenciesWatch)
  yield fork(currencyGraphFlow)
}
