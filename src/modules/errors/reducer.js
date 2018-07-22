import { combineReducers } from 'redux'
import { handleActions, combineActions } from 'redux-actions'
import * as R from 'ramda'
import { hideError } from './actions'
import {
  fetchAccountFailure,
  purchaseCurrencyFailure,
  sellCurrencyFailure,
} from 'modules/account'
import { fetchBtcFailure, fetchEthFailure } from 'modules/currency'
import { fetchTransactionsFailure } from 'modules/transactions'
import { fetchUserFailure } from 'modules/user'

let id = 0

const list = handleActions(
  {
    [combineActions(
      fetchAccountFailure,
      fetchBtcFailure,
      fetchEthFailure,
      fetchTransactionsFailure,
      fetchUserFailure,
    )]: (state, { payload }) => [
      ...state,
      {
        id: id++,
        display: true,
        heading: 'Ошибка запроса данных',
        message: payload.toString(),
      },
    ],

    [combineActions(purchaseCurrencyFailure, sellCurrencyFailure)]: (
      state,
      { payload },
    ) => [
      ...state,
      {
        id: id++,
        display: true,
        heading: 'Ошибка покупки/продажи валюты',
        message: payload.toString(),
      },
    ],

    [hideError]: (state, { payload }) => {
      const id = payload
      const list = [...state]
      return R.adjust(
        R.assoc('display', false),
        R.findIndex(x => x.id === id, list),
        list,
      )
    },
  },

  [],
)

export default combineReducers({
  list,
})
