import React, { PureComponent } from 'react'
import styled from 'styled-components'

class DashboardSection extends PureComponent {
  render() {
    const { heading, children } = this.props

    return (
      <Section>
        <Heading>{heading}</Heading>
        <div>{children}</div>
      </Section>
    )
  }
}

const Section = styled.section`
  margin-bottom: 50px;
`

const Heading = styled.h2`
  margin: 0 0 35px;
  font-size: 24px;
  font-weight: 400;
  line-height: 28px;
`

export default DashboardSection
