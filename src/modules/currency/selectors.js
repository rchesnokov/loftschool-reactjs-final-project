import moment from 'moment'
import * as R from 'ramda'
import { createSelector } from 'reselect'
import { roundToOneDecimal } from 'utils/helpers'

export const getBtc = state => state.currency.btc
export const getEth = state => state.currency.eth

export const getCurrencies = state => state.currency
export const getSelected = state => state.currency.selected
export const getOffset = state => state.currency.offset
export const getIsBtcFetching = state => state.currency.isBtcFetching
export const getIsEthFetching = state => state.currency.isEthFetching

export const getIsLoading = createSelector(
  [getSelected, getIsBtcFetching, getIsEthFetching],
  (selected, fetchingBtc, fetchingEth) =>
    (selected === 'btc' && fetchingBtc) || (selected === 'eth' && fetchingEth),
)

export const getSelectedCurrencyData = createSelector(
  [getCurrencies, getSelected],
  (currencies, selected) => currencies[selected].reverse(),
)

export const getFormattedCurrencyData = createSelector(
  [getSelectedCurrencyData, getOffset],
  (data, offset) =>
    R.map(entry => R.assoc('mts', timeFormatter(entry, offset), entry), data),
)

export const getCurrentBtcRate = getCurrencyRateMaker('btc')
export const getCurrentEthRate = getCurrencyRateMaker('eth')

export const getCurrentServerTime = createSelector(
  getSelectedCurrencyData,
  data =>
    data.length ? moment(data[data.length - 1].mts).format('HH:mm') : '',
)

function getCurrencyRateMaker(currency) {
  return state => {
    const currencyData = state.currency[currency]
    const lastElement = currencyData.length - 1

    if (lastElement <= 0) {
      return ''
    }

    return roundToOneDecimal(currencyData[lastElement].purchase)
  }
}

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
