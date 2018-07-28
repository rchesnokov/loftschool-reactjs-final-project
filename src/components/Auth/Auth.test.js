import React from 'react'
import { shallow, render } from 'enzyme'
import { Auth, authState } from './Auth'
import { MemoryRouter } from 'react-router-dom'

describe('Компонент Auth', () => {
  it('Рендерит форму логина при prop state="login"', () => {
    const wrapper = shallow(<Auth state="login" />)

    expect(wrapper.contains(authState.login.linkText)).toBeTruthy()
  })

  it('Рендерит форму регистрации при prop state="registration"', () => {
    const wrapper = shallow(<Auth state="registration" />)

    expect(wrapper.contains(authState.registration.linkText)).toBeTruthy()
  })

  it('Рендерит Loader при отправке данных', () => {
    const wrapper = shallow(<Auth state="registration" isFetching={true} />)

    expect(wrapper.find('Loader')).toHaveLength(1)
  })

  it('Рендерит Error при ошибке авторизации', () => {
    const wrapper = render(
      <MemoryRouter>
        <Auth
          state="registration"
          isFetching={false}
          isErrorPresent={true}
          errorMessage="error"
        />
      </MemoryRouter>,
    )

    expect(wrapper.text()).toContain('error')
  })
})
