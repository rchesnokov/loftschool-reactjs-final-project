import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as Recharts from 'recharts'
import Loader from 'components/Loader'
import styled, { css } from 'styled-components'
import {
  getIsLoading,
  getFormattedCurrencyData,
  getCurrentServerTime,
  getOffset,
  selectOffset,
} from 'modules/currency'

const mapStateToProps = state => ({
  currencyData: getFormattedCurrencyData(state),
  currentTime: getCurrentServerTime(state),
  offset: getOffset(state),
  loading: getIsLoading(state),
})

const mapDispatchToProps = {
  selectOffset,
}

class Graph extends PureComponent {
  selectOffset = offset => {
    this.props.selectOffset(offset)
  }

  getXAxisUnit(offset) {
    return offset === '1h' ? '' : offset === '7d' ? 'д.' : 'ч.'
  }

  formatYlineTicks = tick => {
    return Math.round(tick)
  }

  render() {
    const {
      ResponsiveContainer,
      LineChart,
      CartesianGrid,
      XAxis,
      YAxis,
      Legend,
      Line,
    } = Recharts

    const { loading, currencyData, currentTime, offset } = this.props
    const offsetNames = {
      '1h': '1ч',
      '4h': '4ч',
      '8h': '8ч',
      '1d': 'День',
      '7d': 'Неделя',
    }

    return (
      <Wrapper>
        {loading && <Loader />}

        <Header>
          <span>Время сервера: {currentTime}</span>
          <span>
            {['1h', '4h', '8h', '1d', '7d'].map(off => (
              <OffsetControl
                active={offset === off}
                onClick={this.selectOffset.bind(this, off)}
              >
                {offsetNames[off]}
              </OffsetControl>
            ))}
          </span>
        </Header>

        <Body isLoading={loading}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={currencyData}
              margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                interval={20}
                dataKey="mts"
                unit={this.getXAxisUnit(offset)}
              />
              <YAxis
                type="number"
                interval="preserveEnd"
                domain={[99999, 0]}
                tickFormatter={this.formatYlineTicks}
                allowDecimals={false}
              />
              <Legend verticalAlign="top" height={36} />
              <Line
                name="Покупка"
                type="monotone"
                legendType="plainline"
                dot={false}
                dataKey="sell"
                stroke="#4db6e2"
              />
              <Line
                name="Продажа"
                type="monotone"
                legendType="plainline"
                dot={false}
                dataKey="purchase"
                stroke="#db5753"
              />
            </LineChart>
          </ResponsiveContainer>
        </Body>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  border: 2px solid #edf0f1;
  border-radius: 5px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 40px;
  padding: 4px 25px 6px;
  background-color: #edf0f1;
`

const Body = styled.div`
  padding: 10px 0;

  ${props =>
    props.isLoading &&
    css`
      filter: blur(5px);
    `};
`

const OffsetControl = styled.span`
  display: inline-block;
  height: 25px;
  padding: 3px 8px 2px;
  margin: 0 6px;
  font-weight: 700;
  line-height: 1;
  border-radius: 3px;
  color: #91a3aa;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    background-color: #f5f5f6;
  }

  ${p =>
    p.active
      ? css`
          color: white;
          cursor: default;
          background-color: #4db6e2;

          &:hover {
            background-color: #4db6e2;
          }
        `
      : null};
`

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Graph)
