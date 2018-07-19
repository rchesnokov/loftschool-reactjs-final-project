import React, { PureComponent } from 'react'
import styled from 'styled-components'
import DashboardSection from 'components/DashboardSection'
import Account from 'components/Account'
import Graph from 'components/Graph'
import History from 'components/History'
import Operations from 'components/Operations'

class Dashboard extends PureComponent {
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
  /* flex-wrap: wrap; */
  padding: 50px;
  background-color: white;
`

const SmallSection = styled.div`
  flex: 0 0 40%;
`

const LargeSection = styled.div`
  flex: 0 0 60%;
`

export default Dashboard
