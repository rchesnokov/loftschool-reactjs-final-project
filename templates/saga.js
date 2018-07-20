import { call, put, takeLatest } from 'redux-saga/effects'
import { action } from './actions'

function* sagaWorker(action) {
  //
}

export function* actionWatch() {
  yield takeLatest(action, sagaWorker)
}
