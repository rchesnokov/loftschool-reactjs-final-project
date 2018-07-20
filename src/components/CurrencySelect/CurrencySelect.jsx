import React, { PureComponent } from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { getCurrentBtcRate, getCurrentEthRate } from 'ducks/currency'

const mapStateToProps = state => ({
  btcRate: getCurrentBtcRate(state),
  ethRate: getCurrentEthRate(state),
})

const mapDispatchToProps = {}

class CurrencySelect extends PureComponent {
  render() {
    const { btcRate, ethRate } = this.props

    return (
      <Wrapper>
        <Currency active>
          <div>{btcRate}</div>
          <div>1 BTC</div>
        </Currency>
        <Currency>
          <div>{ethRate}</div>
          <div>1 ETH</div>
        </Currency>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  margin: 0 auto;
`

const Currency = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 140px;
  margin: 0 10px;
  background-color: #404243;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    background-color: #525556;
  }

  & > * {
    margin: 2px 0;
  }

  ${props =>
    props.active &&
    css`
      cursor: default;
      background-color: #5ebde4;
      &:hover {
        background-color: #5ebde4;
      }
    `};
`

export default connect(mapStateToProps)(CurrencySelect)
