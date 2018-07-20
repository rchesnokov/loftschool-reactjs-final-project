import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import { fetchUserRequest, fetchUserSuccess, fetchUserFailure } from './actions'

const info = handleActions(
  {
    [fetchUserSuccess]: (state, { payload }) => payload,
  },
  {
    email: '',
  },
)

export default combineReducers({ info })
