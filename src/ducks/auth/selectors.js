export const getIsAuthorized = state => state.auth.authorized
export const getIsFetching = state => state.auth.fetching
export const getIsErrorPresent = state => state.auth.error !== null
export const getErrorMessage = state => state.auth.error
