import { fork } from 'redux-saga/effects'
import { flowAuth } from './auth'

export default function*() {
  yield fork(flowAuth)
}
