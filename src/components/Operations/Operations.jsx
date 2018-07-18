import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Table from 'components/Table'
import {} from ''

class Operations extends PureComponent {
  render() {
    const tableContent = [
      [<Rate>0.1</Rate>, <Unit>BTC</Unit>],
      [<Rate>54.45</Rate>, <Unit>$</Unit>, <BuyButton>Продать</BuyButton>],
      [<Rate>55.26</Rate>, <Unit>$</Unit>, <SellButton>Купить</SellButton>],
    ]

    return <Table content={tableContent} />
  }
}

const Value = styled.div`
  padding: 7px 30px 8px;
  line-height: 18px;
  background-color: #f2f2f2;
`

const Rate = Value.extend`
  padding-left: 15px;
  border-radius: 5px 0 0 5px;
`

const Unit = Value.extend`
  padding-right: 15px;
  text-align: right;
  color: #8a8a8a;
  border-radius: 0 5px 5px 0;
`

const Button = styled.button`
  width: 90px;
  padding: 7px 5px 8px;
  margin-left: 20px;
  font-size: 14px;
  line-height: 18px;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`

const BuyButton = Button.extend`
  background-color: #db5753;
`

const SellButton = Button.extend`
  background-color: #4db6e2;
`

export default Operations
