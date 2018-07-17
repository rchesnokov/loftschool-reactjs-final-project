import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Table from 'components/Table'

class Account extends PureComponent {
  render() {
    const content = [
      [<Integer>12.</Integer>, <Decimal>12332</Decimal>, <Unit>ETH</Unit>],
      [<Integer>1.</Integer>, <Decimal>234032</Decimal>, <Unit>BTC</Unit>],
      [<Integer>1 123.</Integer>, <Decimal>00</Decimal>, <Unit>$</Unit>],
    ]

    return <Table content={content} />
  }
}

const Value = styled.div`
  padding: 7px 60px 8px;
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

export default Account
