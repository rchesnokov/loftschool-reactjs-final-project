import { handleActions } from 'redux-actions'
import {
  fetchAccountSuccess,
  purchaseCurrencySuccess,
  sellCurrencySuccess,
} from './actions'

const account = handleActions(
  {
    [fetchAccountSuccess]: (state, { payload }) => payload,
    [purchaseCurrencySuccess]: (state, { payload: { btc, eth, usd } }) => ({
      btc,
      eth,
      usd,
    }),
    [sellCurrencySuccess]: (state, { payload: { btc, eth, usd } }) => ({
      btc,
      eth,
      usd,
    }),
  },
  {
    btc: 0,
    eth: 0,
    usd: 0,
  },
)

export default account
