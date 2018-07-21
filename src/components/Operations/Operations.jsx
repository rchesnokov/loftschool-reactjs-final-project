import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import styled from 'styled-components'
import Table from 'components/Table'
import {
  normalizeNumberInput,
  containsOnlyDigitsAndPoint,
  hasTrailingPoint,
  removeTrailingPoint,
} from 'utils/helpers'
import { getSelectedCurrencyRates } from 'modules/currency'

const mapStateToProps = state => ({
  rates: getSelectedCurrencyRates(state),
})

const mapDispatchToProps = {}

class Operations extends PureComponent {
  state = {
    inputs: {
      cryptocurrency: '1',
      usdSell: '0',
      usdPurchase: '0',
    },
    editing: false,
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { rates } = this.props
    const { inputs, editing } = this.state
    const editingUsd = !!editing && editing !== 'cryptocurrency'

    if (!R.equals(rates, prevProps.rates) && !editingUsd) {
      this.updateInputs()
      return
    }

    if (R.equals(inputs, prevState.inputs)) {
      return
    }

    const stateChanges = R.differenceWith(
      (x, y) => x[1] === y[1],
      R.toPairs(this.state.inputs),
      R.toPairs(prevState.inputs),
    )

    if (!stateChanges.length) {
      return
    }

    this.updateInputs(stateChanges[0])
  }

  updateInputs = name => {
    const cryptocurrency = Number(this.state.inputs.cryptocurrency)
    const { rates } = this.props

    console.log(cryptocurrency, rates)

    this.setState({
      usdSell: String(cryptocurrency * rates.sell),
      usdPurchase: String(cryptocurrency * rates.purchase),
    })
  }

  handleFocus = e => {
    this.setState({ editing: e.target.name })
  }

  hanleBlur = e => {
    let name = e.target.name
    let value = e.target.value
    if (hasTrailingPoint(value)) {
      value = removeTrailingPoint(value)
    }

    this.setState({ [name]: value, editing: false })
  }

  handleInput = e => {
    let name = e.target.name
    let value = e.target.value || '0'

    // Discard typing anything besides numbers and .
    if (!containsOnlyDigitsAndPoint(value)) {
      return
    }

    value = normalizeNumberInput(value)

    this.setState({ [name]: value })
  }

  renderInput(name) {
    return (
      <Input
        name={name}
        type="text"
        value={this.state.inputs[name]}
        onChange={this.handleInput}
        onFocus={this.handleFocus}
        onBlur={this.hanleBlur}
      />
    )
  }

  render() {
    const tableContent = [
      [<Rate>{this.renderInput('cryptocurrency')}</Rate>, <Unit>BTC</Unit>],
      [
        <Rate>{this.renderInput('usdSell')}</Rate>,
        <Unit>$</Unit>,
        <BuyButton>Продать</BuyButton>,
      ],
      [
        <Rate>{this.renderInput('usdPurchase')}</Rate>,
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
