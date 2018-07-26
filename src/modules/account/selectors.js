// @flow

import { type State } from '../../types/index'

export const getBtc = (state: State): number => state.account.btc
export const getEth = (state: State): number => state.account.eth
export const getUsd = (state: State): number => state.account.usd
