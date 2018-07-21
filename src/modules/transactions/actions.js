import { createActions } from 'redux-actions'

export const {
  fetchTransactionsRequest,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
} = createActions(
  'FETCH_TRANSACTIONS_REQUEST',
  'FETCH_TRANSACTIONS_SUCCESS',
  'FETCH_TRANSACTIONS_FAILURE',
)
