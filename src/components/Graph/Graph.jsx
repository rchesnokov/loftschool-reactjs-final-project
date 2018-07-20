import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as Recharts from 'recharts'
import styled, { css } from 'styled-components'
import { getBtc } from 'modules/currency'

const mapStateToProps = state => ({
  currencyData: getBtc(state),
})

const mapDispatchToProps = {}

class Graph extends PureComponent {
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

    const { currencyData } = this.props

    return (
      <Wrapper>
        <Header>
          <span>Время сервера: 07:07</span>
          <span>
            <OffsetControl active>1ч</OffsetControl>
            <OffsetControl>4ч</OffsetControl>
            <OffsetControl>День</OffsetControl>
            <OffsetControl>Неделя</OffsetControl>
            <OffsetControl>Месяц</OffsetControl>
          </span>
        </Header>
        <Body>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={currencyData}
              margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis interval={10} dataKey="name" />
              <YAxis
                type="number"
                domain={[99999, 0]}
                tickFormatter={this.formatYlineTicks}
                allowDecimals={false}
              />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dot={false}
                dataKey="sell"
                stroke="#4db6e2"
              />
              <Line
                type="monotone"
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
  overflow: hidden;
  border: 2px solid #edf0f1;
  border-radius: 5px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 4px 25px 6px;
  background-color: #edf0f1;
`

const Body = styled.div`
  padding: 10px 0;
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
