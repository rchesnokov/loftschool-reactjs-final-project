import { createSelector } from 'reselect'
import { getSelected } from 'modules/currency/index'
import * as R from 'ramda'

export const getTransactions = state => state.transactions.data
export const getTransactionsByCurrency = createSelector(
  [getSelected, getTransactions],
  (selected, transactions) =>
    R.filter(x => R.has(`${selected}_delta`)(x), transactions),
)
export const getFormattedTransactions = createSelector(
  getTransactionsByCurrency,
  transactions => transactions,
)
