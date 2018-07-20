import { combineReducers } from 'redux'
import { handleAction, handleActions } from 'redux-actions'
import { fetchBtcSuccess, fetchEthSuccess } from './actions'

const btc = handleAction([fetchBtcSuccess], (_, { payload }) => payload, [])
const eth = handleAction([fetchEthSuccess], (_, { payload }) => payload, [])

export default combineReducers({ btc, eth })
