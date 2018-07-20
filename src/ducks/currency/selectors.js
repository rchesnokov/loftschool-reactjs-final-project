import { roundToOneDecimal } from 'utils/helpers'

export const getBtc = state => state.currency.btc
export const getEth = state => state.currency.eth
export const getCurrentBtcRate = getCurrencyRateMaker('btc')
export const getCurrentEthRate = getCurrencyRateMaker('eth')

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
