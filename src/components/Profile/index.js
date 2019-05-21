import React from 'react'

import { AuthUserContext, withAuthorization } from '../Session'

const Profile = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h3>Profile</h3>
        <p>Account: {authUser.email}</p>
      </div>
    )}
  </AuthUserContext.Consumer>
)

export default withAuthorization(Profile)
