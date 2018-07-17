import React, { PureComponent } from 'react'
import styled from 'styled-components'
import DashboardSection from 'components/DashboardSection'
import Account from 'components/Account'

class Dashboard extends PureComponent {
  render() {
    return (
      <Container>
        <SmallSection>
          <DashboardSection heading="Ваш счет">
            <Account />
          </DashboardSection>
          <DashboardSection heading="Покупка/продажа">asd</DashboardSection>
        </SmallSection>
        <LargeSection>
          <DashboardSection heading="Окно графика">asd</DashboardSection>
          <DashboardSection heading="История операций">asd</DashboardSection>
        </LargeSection>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  /* flex-wrap: wrap; */
  padding: 50px 0;
`

const SmallSection = styled.div`
  flex: 0 0 40%;
`

const LargeSection = styled.div`
  flex: 0 0 60%;
`

export default Dashboard
