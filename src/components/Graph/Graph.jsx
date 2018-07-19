import React, { PureComponent } from 'react'
import * as Recharts from 'recharts'
import styled, { css } from 'styled-components'

class Graph extends PureComponent {
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

    const data = [
      { name: '', uv: 4000, pv: 2400, amt: 2400 },
      { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
      { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
      { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
      { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
      { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
      { name: '', uv: 3490, pv: 4300, amt: 2100 },
    ]

    return (
      <Wrapper>
        <Header>
          <span>Время сервера: 07:07</span>
          <span>
            <OffsetControl active>День</OffsetControl>
            <OffsetControl>Неделя</OffsetControl>
            <OffsetControl>Месяц</OffsetControl>
          </span>
        </Header>
        <Body>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Legend verticalAlign="top" height={36} />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
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

  ${p =>
    p.active
      ? css`
          color: white;
          background-color: #4db6e2;
        `
      : null};
`

export default Graph
