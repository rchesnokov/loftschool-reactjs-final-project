import reducer from './index'
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logout,
} from './actions'

const initialState = {
  authorized: false,
  fetching: false,
  error: null,
}

describe('Reducer auth', () => {
  it('Инициализация с корректным state:', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  describe('Экшны loginRequest и registerRequest:', () => {
    const actionLogin = loginRequest()
    const actionRegister = registerRequest()

    it('выставляют значение fetching === true', () => {
      expect(reducer(initialState, actionLogin)).toMatchObject({
        fetching: true,
      })
      expect(reducer(initialState, actionRegister)).toMatchObject({
        fetching: true,
      })
    })

    it('очищают имеющуюся ошибку', () => {
      expect(reducer({ error: 'error' }, actionLogin)).toMatchObject({
        error: null,
      })
      expect(reducer({ error: 'error' }, actionRegister)).toMatchObject({
        error: null,
      })
    })
  })

  describe('Экшны loginSuccess и registerSuccess:', () => {
    const actionLogin = loginSuccess({ data: 'somedata' })
    const actionRegister = loginSuccess({ data: 'somedata' })

    it('выставляют значение authorized === true', () => {
      expect(reducer(initialState, actionLogin)).toMatchObject({
        authorized: true,
      })
      expect(reducer(initialState, actionRegister)).toMatchObject({
        authorized: true,
      })
    })

    it('выставляют значение fetching === false', () => {
      expect(reducer({ fetching: true }, actionLogin)).toMatchObject({
        fetching: false,
      })
      expect(reducer({ fetching: true }, actionRegister)).toMatchObject({
        fetching: false,
      })
    })

    it('очищают имеющуюся ошибку', () => {
      expect(reducer({ error: 'error' }, actionLogin)).toMatchObject({
        error: null,
      })
      expect(reducer({ error: 'error' }, actionRegister)).toMatchObject({
        error: null,
      })
    })
  })

  describe('Экшны loginFailure и registerFailure:', () => {
    const actionLogin = loginFailure('error')
    const actionRegister = loginFailure('error')

    it('выставляют значение fetching === false', () => {
      expect(reducer({ fetching: true }, actionLogin)).toMatchObject({
        fetching: false,
      })
      expect(reducer({ fetching: true }, actionRegister)).toMatchObject({
        fetching: false,
      })
    })

    it('устанавливают ошибку', () => {
      expect(reducer(initialState, actionLogin)).toMatchObject({
        error: 'error',
      })
      expect(reducer(initialState, actionRegister)).toMatchObject({
        error: 'error',
      })
    })
  })

  describe('Экшн logout:', () => {
    const action = logout()

    it('выставляют значение authorized === false', () => {
      expect(reducer({ authorized: true }, action)).toMatchObject({
        authorized: false,
      })
    })
  })
})
