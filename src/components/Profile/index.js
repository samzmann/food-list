import React from 'react'
import ReviewList from '../ReviewList'
import { AuthUserContext, withAuthorization } from '../Session'

const Profile = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h3>Profile</h3>
        <p>Account: {authUser.email}</p>
        <h4>Your reviews:</h4>
        <ReviewList />
      </div>
    )}
  </AuthUserContext.Consumer>
)

export default withAuthorization(Profile)
