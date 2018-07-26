import { flowAuth, authorize } from './saga'
import { call, put, take } from 'redux-saga/effects'
import { setTokenApi, clearTokenApi } from 'api/server'
import {
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from 'api/localStorage'
import { loginRequest, loginSuccess, registerRequest, logout } from './actions'
import { fetchUserRequest } from 'modules/user'
import { fetchAccountRequest } from 'modules/account'

describe('AUTH saga', () => {
  describe('Сага flowAuth', () => {
    describe('Сценарий 1: логин с токеном из localStorage', () => {
      const gen = flowAuth()

      it('Получает токен из localStorage', () => {
        expect(gen.next().value).toEqual(call(getTokenFromLocalStorage))
      })

      it('Вызывает метод setToken', () => {
        expect(gen.next('jwt_token').value).toEqual(
          call(setTokenApi, 'jwt_token'),
        )
      })

      it('Вызывает экшн loginSuccess', () => {
        expect(gen.next().value).toEqual(put(loginSuccess()))
      })
    })

    describe('Сценарий 2: логин с введенными данными авторизации', () => {
      const gen = flowAuth()

      it('Проверяет токен в localStorage', () => {
        expect(gen.next().value).toEqual(call(getTokenFromLocalStorage))
      })

      it('Получает событие авторизации/регистрации', () => {
        expect(gen.next().value).toEqual(take([loginRequest, registerRequest]))
      })

      it('Вызывает сагу авторизации/регистрации', () => {
        expect(
          gen.next({
            type: loginRequest.toString(),
            payload: {
              email: '1',
              password: '2',
            },
          }).value,
        ).toEqual(call(authorize, '1', '2'))
      })
    })

    describe('После авторизации:', () => {
      const gen = flowAuth()
      gen.next()
      gen.next('token')
      gen.next()

      it('Вызывает экшены fetchUserRequest и fetchAccountRequest', () => {
        expect(gen.next().value).toEqual(put(fetchUserRequest()))
        expect(gen.next().value).toEqual(put(fetchAccountRequest()))
      })

      it('Ожидает события logout', () => {
        expect(gen.next().value).toEqual(take(logout))
      })

      it('При событии logout вызывает функции removeTokenFromLocalStorage и clearTokenApi', () => {
        expect(gen.next().value).toEqual(call(removeTokenFromLocalStorage))
        expect(gen.next().value).toEqual(call(clearTokenApi))
      })

      it('Продолжает работу в цикле', () => {
        const next = gen.next()
        expect(next.done).toEqual(false)
        expect(next.value).toEqual(call(getTokenFromLocalStorage))
      })
    })
  })
})
