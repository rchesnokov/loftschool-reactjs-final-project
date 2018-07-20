export const roundToOneDecimal = number => Math.round(number * 10) / 10

export const getIntegerPart = number => Math.trunc(number)
export const getDecimalPart = number =>
  (number % 1)
    .toFixed(10)
    .replace(/0+$/, '')
    .substring(2) || 0 //TODO: test this

export const normalizeNumberInput = value =>
  value
    .replace(/^$/g, '0') // sets 0 if empty
    .replace(/^0*(\d)/g, '$1') // remove first zeroes
    .replace(/^\./g, '0.') // add zero before first .

export const removeTrailingPoint = value => value.replace(/\.$/g, '') // remove trailing comma
