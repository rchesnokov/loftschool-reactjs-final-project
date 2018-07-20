export const roundToOneDecimal = number => Math.round(number * 10) / 10

export const getIntegerPart = number => Math.trunc(number)
export const getDecimalPart = number =>
  (number % 1)
    .toFixed(10)
    .replace(/0+$/, '')
    .substring(2) || 0 //TODO: test this
