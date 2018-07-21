import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { equals } from 'ramda'
import styled from 'styled-components'
import Table from 'components/Table'
import { normalizeNumberInput, removeTrailingPoint } from 'utils/helpers'
import { getSelectedCurrencyRates } from 'modules/currency'

const mapStateToProps = state => ({
  rates: getSelectedCurrencyRates(state),
})

const mapDispatchToProps = {}

class Operations extends PureComponent {
  state = {
    crypto: '0',
    sell: '0',
    purchase: '0',
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (equals(this.state, prevState)) {
      return
    }
  }

  cleanupValue = e => {
    let name = e.target.name
    let value = e.target.value
    if (/\.$/.test(value)) {
      this.setState({ [name]: removeTrailingPoint(value) })
    }
  }

  handleInput = e => {
    let name = e.target.name
    let value = e.target.value

    // Discard typing anything besides numbers and .
    if (!/^[\d\.]*$/gi.test(value)) {
      console.log('return')
      return
    }

    this.setState({
      [name]: normalizeNumberInput(value),
    })
  }

  render() {
    const { crypto, sell, purchase } = this.state

    const tableContent = [
      [
        <Rate>
          <Input
            name="crypto"
            type="text"
            value={crypto}
            onChange={this.handleInput}
            onBlur={this.cleanupValue}
          />
        </Rate>,
        <Unit>BTC</Unit>,
      ],
      [
        <Rate>
          <Input
            name="sell"
            type="text"
            value={sell}
            onChange={this.handleInput}
            onBlur={this.cleanupValue}
          />
        </Rate>,
        <Unit>$</Unit>,
        <BuyButton>Продать</BuyButton>,
      ],
      [
        <Rate>
          <Input
            name="purchase"
            type="text"
            value={purchase}
            onChange={this.handleInput}
            onBlur={this.cleanupValue}
          />
        </Rate>,
        <Unit>$</Unit>,
        <SellButton>Купить</SellButton>,
      ],
    ]

    return <Table content={tableContent} />
  }
}

const Value = styled.div`
  padding: 7px 10px 8px;
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

const Input = styled.input`
  width: 100px;
  padding: 0;
  font-size: 14px;
  line-height: 1;
  border: none;
  background-color: transparent;
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
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
`

const BuyButton = Button.extend`
  background-color: #db5753;

  &:hover {
    background-color: #de6764;
  }
`

const SellButton = Button.extend`
  background-color: #4db6e2;

  &:hover {
    background-color: #5ebde4;
  }
`

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Operations)
