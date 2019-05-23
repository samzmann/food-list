export const userActions = {
  SET_USER_FROM_DB: 'SET_USER_FROM_DB',
}

export const setUserFromDB = user => ({
  type: userActions.SET_USER_FROM_DB,
  user
})
