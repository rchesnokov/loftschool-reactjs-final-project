// @flow

import React, { PureComponent } from 'react'
import styled from 'styled-components'
import DashboardSection from 'components/DashboardSection'
import Account from 'components/Account'
import Graph from 'components/Graph'
import History from 'components/History'
import Operations from 'components/Operations'

type Props = {}

class Dashboard extends PureComponent<Props> {
  render() {
    return (
      <Container>
        <SmallSection>
          <DashboardSection heading="Ваш счет">
            <Account />
          </DashboardSection>

          <DashboardSection heading="Покупка/продажа">
            <Operations />
          </DashboardSection>
        </SmallSection>

        <LargeSection>
          <DashboardSection heading="Окно графика">
            <Graph />
          </DashboardSection>

          <DashboardSection heading="История операций">
            <History />
          </DashboardSection>
        </LargeSection>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  padding: 50px;
  background-color: white;

  @media (max-width: 1280px) {
    padding: 30px 10px;
    flex-wrap: wrap;
  }
`

const SmallSection = styled.div`
  flex: 0 0 40%;

  @media (max-width: 1280px) {
    display: flex;
    flex-basis: 100%;

    & > * {
      margin-right: 30px;
    }
  }
`

const LargeSection = styled.div`
  flex: 0 0 60%;

  @media (max-width: 1280px) {
    flex-basis: 100%;
  }
`

export default Dashboard
