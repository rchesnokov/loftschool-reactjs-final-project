import { createActions } from 'redux-actions'

export const {
  fetchAccountRequest,
  fetchAccountSuccess,
  fetchAccountFailure,
} = createActions(
  'FETCH_ACCOUNT_REQUEST',
  'FETCH_ACCOUNT_SUCCESS',
  'FETCH_ACCOUNT_FAILURE',
)
