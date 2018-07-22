import React, { PureComponent } from 'react'
import styled from 'styled-components'

class DashboardSection extends PureComponent {
  render() {
    const { heading, children } = this.props

    return (
      <Section>
        <Heading>{heading}</Heading>
        <Body>{children}</Body>
      </Section>
    )
  }
}

const Section = styled.section`
  margin-bottom: 50px;

  &:last-child {
    margin-bottom: 0;
  }
`

const Heading = styled.h2`
  margin: 0 0 35px;
  font-size: 24px;
  font-weight: 400;
  line-height: 28px;
`

const Body = styled.div`
  padding-bottom: 1px;
`

export default DashboardSection
