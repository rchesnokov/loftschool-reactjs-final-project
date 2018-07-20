import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import {
  fetchAccountRequest,
  fetchAccountSuccess,
  fetchAccountFailure,
} from './actions'

const account = handleActions(
  {
    [fetchAccountSuccess]: (state, { payload }) => payload,
  },
  {
    btc: 0,
    eth: 0,
    usd: 0,
  },
)

export default account
