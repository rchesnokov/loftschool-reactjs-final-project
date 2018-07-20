import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import { action1, action2 } from './actions'

const test = handleActions({
  [action1]: (state, { payload }) => payload,
  [action2]: (state, { payload }) => payload,
}, null)

export default combineReducers({
  test,
})
