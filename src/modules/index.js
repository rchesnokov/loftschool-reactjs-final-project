import { combineReducers } from 'redux'
import account from './account'
import auth from './auth'
import currency from './currency'
import transactions from './transactions'
import user from './user'

export default combineReducers({ account, auth, currency, transactions, user })
