import {
  loginAPI,
  setLocalToken,
  resetLocalToken,
  resultOK,
  JWT_TOKEN
} from 'api'

export const LOGIN_AUTH_PENDING = 'LOGIN_AUTH_PENDING'
export const LOGIN_AUTH_SUCCESS = 'LOGIN_AUTH_SUCCESS'
export const LOGIN_AUTH_FAIL = 'LOGIN_AUTH_FAIL'

export const LOGOUT_AUTH_SUCCESS = 'LOGOUT_AUTH_SUCCESS'

// обобщить функцию хорошая идея для DRY?
export const LOGIN_AUTH = async data => {
  let result = await loginAPI(data)
  if (!resultOK(result)) {
    return {type: LOGIN_AUTH_FAIL, errors: result.data}
  }
  setLocalToken(result.data[JWT_TOKEN])
  return {type: LOGIN_AUTH_SUCCESS, result: result.data}
}

export const LOGOUT_AUTH = () => {
  resetLocalToken()
  return {type: LOGOUT_AUTH_SUCCESS}
}
