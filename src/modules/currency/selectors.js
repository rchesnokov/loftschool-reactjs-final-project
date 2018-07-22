import moment from 'moment'
import * as R from 'ramda'
import { createSelector } from 'reselect'
import { roundToTwoDecimals } from 'utils/helpers'

export const getBtc = state => state.currency.btc
export const getEth = state => state.currency.eth
export const getSelected = state => state.currency.selected
export const getOffset = state => state.currency.offset
export const getIsBtcFetching = state => state.currency.isBtcFetching
export const getIsEthFetching = state => state.currency.isEthFetching

export const getIsLoading = createSelector(
  [getSelected, getIsBtcFetching, getIsEthFetching],
  (selected, fetchingBtc, fetchingEth) =>
    (selected === 'btc' && fetchingBtc) || (selected === 'eth' && fetchingEth),
)

export const getCurrencies = createSelector([getBtc, getEth], (btc, eth) => ({
  btc: R.reverse(btc),
  eth: R.reverse(eth),
}))

export const getSelectedCurrencyData = createSelector(
  [getCurrencies, getSelected],
  (currencies, selected) => currencies[selected],
)

export const getFormattedCurrencyData = createSelector(
  [getSelectedCurrencyData, getOffset],
  (data, offset) =>
    R.map(entry => R.assoc('mts', timeFormatter(entry, offset), entry), data),
)

export const getSelectedCurrencyRates = createSelector(
  getSelectedCurrencyData,
  data => {
    return data.length ? data[data.length - 1] : { sell: 0, purchase: 0 }
  },
)

export const getCurrentBtcRate = createSelector([getCurrencies], data => {
  const lastElement = data.btc.length - 1
  return lastElement <= 0
    ? ''
    : roundToTwoDecimals(data.btc[lastElement].purchase)
})

export const getCurrentEthRate = createSelector([getCurrencies], data => {
  const lastElement = data.eth.length - 1
  return lastElement <= 0
    ? ''
    : roundToTwoDecimals(data.eth[lastElement].purchase)
})

export const getCurrentServerTime = createSelector(
  getSelectedCurrencyData,
  data =>
    data.length ? moment(data[data.length - 1].mts).format('HH:mm') : '',
)

function timeFormatter(entry, offset) {
  let timeFormat
  switch (offset) {
    case '1h':
      timeFormat = 'HH:mm'
      break
    case '7d':
      timeFormat = 'DD'
      break
    default:
      timeFormat = 'HH'
  }

  return moment(entry.mts).format(timeFormat)
}
