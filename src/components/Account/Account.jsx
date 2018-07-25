// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Table from 'components/Table'
import { getBtc, getEth, getUsd } from 'modules/account'
import { getIntegerPart, getDecimalPart } from 'utils/helpers'

type Props = {
  btc: number,
  eth: number,
  usd: number,
}

const mapStateToProps = state => ({
  btc: getBtc(state),
  eth: getEth(state),
  usd: getUsd(state),
})

class Account extends PureComponent<Props> {
  render() {
    const { btc, eth, usd } = this.props
    const currencyNames = ['BTH', 'ETC', '$']
    const tableContent = [btc, eth, usd].map((currency, index) => [
      <Integer>{getIntegerPart(currency)}.</Integer>,
      <Decimal>{getDecimalPart(currency)}</Decimal>,
      <Unit>{currencyNames[index]}</Unit>,
    ])

    return <Table content={tableContent} />
  }
}

const Value = styled.div`
  height: 35px;
  padding: 7px 60px 8px;
  line-height: 20px;
  background-color: #404243;
`

const Integer = Value.extend`
  padding-right: 0;
  font-weight: 700;
  text-align: right;
  color: white;
  border-radius: 5px 0 0 5px;
`

const Decimal = Value.extend`
  padding-left: 0;
  color: #8a8a8a;
  border-radius: 0 5px 5px 0;
`

const Unit = styled.div`
  padding: 7px 20px 8px;
`

export default connect(mapStateToProps)(Account)
