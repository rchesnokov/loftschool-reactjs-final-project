const LOCAL_STORAGE_KEY = 'authToken'

export const getTokenFromLocalStorage = () =>
  localStorage.getItem(LOCAL_STORAGE_KEY)

export const setTokenToLocalStorage = token => {
  localStorage.setItem(LOCAL_STORAGE_KEY, token)
}

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY)
}
