import React, { PureComponent } from 'react'
import styled from 'styled-components'
import logo from './images/Logo-white.svg'

class Layout extends PureComponent {
  render() {
    const { children, logoutHandler } = this.props

    return (
      <PageWrapper>
        <Header>
          <Container>
            <HeaderInner>
              <Logo src={logo} />
              <SectionName>Торги</SectionName>
              <Rates>
                <Currency>
                  <div>4 277,6</div>
                  <div>1 BTC</div>
                </Currency>
                <Currency>
                  <div>290</div>
                  <div>1 ETH</div>
                </Currency>
              </Rates>
              <HeaderButton onClick={logoutHandler}>Выйти</HeaderButton>
            </HeaderInner>
          </Container>
        </Header>

        <Content>
          <Container>{children}</Container>
        </Content>

        <Footer>
          <Container>
            <FooterInner>
              <Copyright>
                Сделано с любовью и старанием <br />
                на курсе "React.js" в Loftschool. <br />
                Автор работы: <strong>Роман Чесноков</strong>
              </Copyright>
              <Logo src={logo} />
            </FooterInner>
          </Container>
        </Footer>
      </PageWrapper>
    )
  }
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`

const Content = styled.section`
  flex-grow: 1;
  background-color: #f5f5f5;
`

const Header = styled.div`
  background-color: #2a2c2e;
`

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
`

const Logo = styled.img`
  display: block;
  height: 50px;
  width: auto;
  margin: 0 20px;
`

const SectionName = styled.span`
  margin-left: 50px;
  color: #61dafb;
  font-weight: 700;
`

const Rates = styled.div`
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

  & > * {
    margin: 2px 0;
  }
`

const HeaderButton = styled.button`
  height: 5rem;
  width: 100px;
  background-color: #f5f5f5;
  color: #2a2c2e;
  border: none;
  border-radius: 7px;
`

const Footer = styled.div`
  background-color: #2a2c2e;
  color: #fff;
`

const FooterInner = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
`

const Copyright = styled.div`
  margin-right: auto;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.33;
`

export default Layout
