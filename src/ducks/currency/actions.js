import { createActions } from 'redux-actions'

export const {
  fetchBtcRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthRequest,
  fetchEthSuccess,
  fetchEthFailure,
} = createActions(
  'FETCH_BTC_REQUEST',
  'FETCH_BTC_SUCCESS',
  'FETCH_BTC_FAILURE',
  'FETCH_ETH_REQUEST',
  'FETCH_ETH_SUCCESS',
  'FETCH_ETH_FAILURE',
)
