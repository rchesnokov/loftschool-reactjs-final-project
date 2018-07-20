import { combineReducers } from 'redux'
import { handleAction, handleActions } from 'redux-actions'
import {
  fetchBtcRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthRequest,
  fetchEthSuccess,
  fetchEthFailure,
  selectCurrency,
  selectOffset,
} from './actions'

const btc = handleAction([fetchBtcSuccess], (_, { payload }) => payload, [])
const eth = handleAction([fetchEthSuccess], (_, { payload }) => payload, [])

const selected = handleAction(
  [selectCurrency],
  (_, { payload }) => payload,
  'btc',
)

const offset = handleAction([selectOffset], (_, { payload }) => payload, '1h')

const isBtcFetching = handleActions(
  {
    [fetchBtcSuccess]: () => false,
    [fetchBtcFailure]: () => false,
    [selectCurrency]: () => true,
    [selectOffset]: () => true,
  },
  true,
)

const isEthFetching = handleActions(
  {
    [fetchEthSuccess]: () => false,
    [fetchEthFailure]: () => false,
    [selectCurrency]: () => true,
    [selectOffset]: () => true,
  },
  true,
)

export default combineReducers({
  btc,
  eth,
  isBtcFetching,
  isEthFetching,
  selected,
  offset,
})
