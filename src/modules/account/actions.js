import { createActions } from 'redux-actions'

export const {
  fetchAccountRequest,
  fetchAccountSuccess,
  fetchAccountFailure,
  purchaseCurrencyRequest,
  purchaseCurrencySuccess,
  purchaseCurrencyFailure,
  sellCurrencyRequest,
  sellCurrencySuccess,
  sellCurrencyFailure,
} = createActions(
  'FETCH_ACCOUNT_REQUEST',
  'FETCH_ACCOUNT_SUCCESS',
  'FETCH_ACCOUNT_FAILURE',
  'PURCHASE_CURRENCY_REQUEST',
  'PURCHASE_CURRENCY_SUCCESS',
  'PURCHASE_CURRENCY_FAILURE',
  'SELL_CURRENCY_REQUEST',
  'SELL_CURRENCY_SUCCESS',
  'SELL_CURRENCY_FAILURE',
)
