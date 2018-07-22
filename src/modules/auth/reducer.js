import { combineReducers } from 'redux'
import { handleActions, combineActions } from 'redux-actions'
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logout,
} from './actions'

const authorized = handleActions(
  {
    [loginSuccess]: () => true,
    [logout]: () => false,
  },
  false,
)

const fetching = handleActions(
  {
    [combineActions(loginRequest, registerRequest)]: () => true,
    [combineActions(loginSuccess, registerSuccess)]: () => false,
    [combineActions(loginFailure, registerFailure)]: () => false,
  },
  false,
)

const error = handleActions(
  {
    [combineActions(loginRequest, registerRequest)]: () => null,
    [combineActions(loginSuccess, registerSuccess)]: () => null,
    [combineActions(loginFailure, registerFailure)]: (_, { payload }) =>
      payload,
  },
  null,
)

export default combineReducers({ authorized, fetching, error })
