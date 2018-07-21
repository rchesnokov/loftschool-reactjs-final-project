import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import {
  fetchTransactionsRequest,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
} from './actions'

const data = handleActions(
  {
    [fetchTransactionsSuccess]: (state, { payload }) => payload,
  },
  [],
)

export default combineReducers({ data })
