import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import { fetchUserSuccess } from './actions'

const info = handleActions(
  {
    [fetchUserSuccess]: (state, { payload }) => payload,
  },
  {
    email: '',
  },
)

export default combineReducers({ info })
