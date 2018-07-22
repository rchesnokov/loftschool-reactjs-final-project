import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { Particles } from 'react-particles-js'
import particlesParams from 'utils/particles-params'
import CurrencySelect from 'components/CurrencySelect'
import Errors from 'components/Errors'
import logo from './images/Logo-white.svg'
class Layout extends PureComponent {
  render() {
    const { children, logoutHandler, userEmail } = this.props

    return (
      <PageWrapper>
        <ErrorsContainer>
          <Errors />
        </ErrorsContainer>

        <Header>
          <Container>
            <HeaderInner>
              <Logo src={logo} />
              <SectionName>Торги</SectionName>
              <CurrencySelect />
              <User>{userEmail}</User>
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

  @media (max-width: 1280px) {
    padding: 0 5px;
  }
`

const Main = styled.main`
  position: relative;
  flex-grow: 1;
`

const Content = styled.section`
  position: relative;
  z-index: 1;
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

  @media (max-width: 1280px) {
    display: none;
  }
`

const User = styled.div`
  width: 120px;
  margin-right: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
  line-height: 20px;
  color: white;

  @media (max-width: 1280px) {
    display: none;
  }
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

const ErrorsContainer = styled.div`
  z-index: 999;
  position: fixed;
  top: 10px;
  right: 20px;
`

export default Layout
