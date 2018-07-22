import { createSelector } from 'reselect'
import { getSelected } from 'modules/currency/index'
import * as R from 'ramda'
import moment from 'moment'
import { removeDecimalAfterFourth } from 'utils/helpers'

export const getTransactions = state => state.transactions.data
export const getTransactionsByCurrency = createSelector(
  [getSelected, getTransactions],
  (selected, transactions) =>
    R.pipe(
      R.filter(t => R.has(`${selected}_delta`)(t)),
      R.map(t => {
        const delta = R.prop(`${selected}_delta`, t)
        const woDelta = R.dissoc(`${selected}_delta`, t)
        return R.assoc('crypto_delta', delta, woDelta)
      }),
    )(transactions),
)
export const getFormattedTransactions = createSelector(
  getTransactionsByCurrency,
  transactions =>
    transactions.map(transaction => {
      return {
        ...transaction,
        name: transaction.crypto_delta[0] === '+' ? 'Покупка' : 'Продажа',
        created_at: moment(transaction.created_at).format('DD-MM-YYYY HH:mm'),
        usd_delta: removeDecimalAfterFourth(transaction.usd_delta),
      }
    }),
)
