// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { Redirect } from 'react-router-dom'
import { Formik } from 'formik'
import { Particles } from 'react-particles-js'
import particlesParams from 'utils/particles-params'

import Field from 'components/Field'
import Loader from 'components/Loader'

import {
  loginRequest,
  registerRequest,
  getIsAuthorized,
  getIsFetching,
  getIsErrorPresent,
  getErrorMessage,
} from 'modules/auth'

import logo from './images/Logo.svg'
import iconUser from './images/user-shape.svg'
import iconLock from './images/padlock-unlock.svg'
import { type State } from 'types/index'

type Credentials = {
  email: string,
  password: string,
}

type Props = {
  state: 'login' | 'registration',
  isAuthorized: boolean,
  isFetching: boolean,
  isErrorPresent: boolean,
  errorMessage: string,
  loginRequest: Credentials => void,
  registerRequest: Credentials => void,
}

const mapStateToProps = (state: State) => ({
  isAuthorized: getIsAuthorized(state),
  isFetching: getIsFetching(state),
  isErrorPresent: getIsErrorPresent(state),
  errorMessage: getErrorMessage(state),
})

const mapDispatchToProps = { loginRequest, registerRequest }

export const authState = {
  login: {
    submitText: 'Войти',
    switchText: 'Впервые на сайте?',
    linkText: 'Зарегистрироваться',
    linkPath: '/register',
  },
  registration: {
    submitText: 'Зарегистрироваться',
    switchText: 'Уже зарегистрированы?',
    linkText: 'Войти',
    linkPath: '/login',
  },
}

export class Auth extends PureComponent<Props> {
  handleFormSubmit = ({ email, password }: Credentials) => {
    const { state, loginRequest, registerRequest } = this.props
    const dispatchAction = state === 'login' ? loginRequest : registerRequest
    dispatchAction({ email, password })
  }

  render() {
    const {
      state,
      isAuthorized,
      isFetching,
      isErrorPresent,
      errorMessage,
    } = this.props
    const { submitText, switchText, linkText, linkPath } = authState[state]

    if (isAuthorized) {
      return <Redirect to="/" />
    }

    return (
      <Wrapper>
        <Container>
          <Logo src={logo} alt="logotype" />

          <Block>
            {isFetching && <Loader />}

            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={this.handleFormSubmit}
              render={({ handleChange, handleSubmit }) => (
                <Form action="" onSubmit={handleSubmit}>
                  {isErrorPresent && <Error>{errorMessage}</Error>}
                  <Field
                    type="email"
                    name="email"
                    placeholder="email"
                    icon={iconUser}
                    onChange={handleChange}
                  />
                  <Field
                    type="password"
                    name="password"
                    placeholder="password"
                    icon={iconLock}
                    onChange={handleChange}
                  />
                  <Button type="submit">{submitText}</Button>
                </Form>
              )}
            />
          </Block>

          <Block centered>
            <p>
              {switchText}{' '}
              <Link className="link" to={linkPath}>
                {linkText}
              </Link>
            </p>
          </Block>
        </Container>

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
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  background-color: #f5f5f5;
`

const Container = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 440px;
`

const Block = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 7px;
  border: 1px solid #dfdfdf;
  background-color: #fff;
  box-shadow: 0px 0px 68px 4px rgba(0, 0, 0, 0.23);

  p {
    margin: 5px 0;
    line-height: 1.8rem;
  }

  ${p =>
    p.centered &&
    css`
      text-align: center;
    `};
`

const Logo = styled.img`
  display: block;
  width: 300px;
  height: auto;
`

const Form = styled.form`
  padding: 10px;

  & > * {
    margin: 10px 0;
  }

  input {
    margin-bottom: 10px;
  }
`

const Button = styled.button`
  width: 100%;
  padding: 11px 0 13px;
  border: none;
  font-size: 22px;
  font-weight: 300;
  background-color: #4db6e2;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);

  :hover {
    background-color: #4199be;
  }
`

const Error = styled.div`
  margin: 10px 0 20px;
  padding: 10px 20px;
  border-radius: 7px;
  background-color: #ffe3e3;
`

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth)
