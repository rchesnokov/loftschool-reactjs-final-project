import { createActions } from 'redux-actions'

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logout,
} = createActions(
  'LOGIN_REQUEST',
  'LOGIN_SUCCESS',
  'LOGIN_FAILURE',
  'REGISTER_REQUEST',
  'REGISTER_SUCCESS',
  'REGISTER_FAILURE',
  'LOGOUT',
)
