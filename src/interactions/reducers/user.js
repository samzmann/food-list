import { userActions } from '../actions/user'

const user = (state = {}, action) => {
  const { user } = action
  switch (action.type) {
    case userActions.SET_USER_FROM_DB:
      return user
    default:
      return state
  }
}

export default user
