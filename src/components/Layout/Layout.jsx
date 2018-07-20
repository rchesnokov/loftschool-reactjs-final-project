import React, { PureComponent } from 'react'
import styled, { css } from 'styled-components'
import logo from './images/Logo-white.svg'
import CurrencySelect from 'components/CurrencySelect'

import { Particles } from 'react-particles-js'
import particlesParams from 'utils/particles-params'
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
              <CurrencySelect />
              <User>useruseruser@mail.com</User>
              <HeaderButton onClick={logoutHandler}>Выйти</HeaderButton>
            </HeaderInner>
          </Container>
        </Header>

        <Main>
          <Content>
            <Container>{children}</Container>
          </Content>

          <Particles
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 100 + '%',
              height: 100 + '%',
            }}
            params={particlesParams}
          />
        </Main>

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
  background-color: #f5f5f5;
`

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`

const Main = styled.main`
  position: relative;
`

const Content = styled.section`
  position: relative;
  z-index: 1;
  flex-grow: 1;
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

const User = styled.div`
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 30px;
  line-height: 20px;
  color: white;
`

const HeaderButton = styled.button`
  height: 5rem;
  width: 100px;
  background-color: #f5f5f5;
  color: #2a2c2e;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    background-color: #5ebde4;
    color: white;
  }
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
