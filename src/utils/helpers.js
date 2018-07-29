// @flow

import * as R from 'ramda'

export const roundToTwoDecimals = (number: number): number =>
  Math.round(number * 100) / 100

export const getIntegerPart = (number: number): string =>
  Math.trunc(number).toString()
export const getDecimalPart = (number: number): string =>
  (number % 1)
    .toFixed(4)
    .replace(/0+$/, '')
    .substring(2) || '0'

export const removeDecimalsAfterFourth = (value: string): string =>
  value.replace(/(\.\d{4})\d+/gi, '$1')
export const removeDecimalsAfterEight = (value: string): string =>
  value.replace(/(\.\d{8})\d+/gi, '$1')
export const addZeroBeforePointIfNoInteger = (value: string): string =>
  value.replace(/^\./g, '0.')
export const removeZeroesBeforeFirstDigit = (value: string): string =>
  value.replace(/^0*(\d)/g, '$1')
export const removeTrailingPoint = (value: string): string =>
  value.replace(/\.$/g, '')
export const replaceEmptyStringWithZero = (value: string): string =>
  value.replace(/^$/g, '0')

export const normalizeNumberInput = (value: string): string =>
  R.pipe(
    replaceEmptyStringWithZero,
    addZeroBeforePointIfNoInteger,
    removeZeroesBeforeFirstDigit,
    removeDecimalsAfterEight,
  )(value)

export const containsOnlyDigitsAndPoint = (value: string): boolean =>
  /^\d+(\.\d*)?$/gi.test(value)
export const hasTrailingPoint = (value: string): boolean => /\.$/.test(value)
