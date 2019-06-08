import React from 'react'
import ReviewForm from './ReviewForm'
import { AuthUserContext, withAuthorization } from '../Session'

const CreateReview = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h3>Create a new review</h3>
        <ReviewForm authUser={authUser} />
      </div>
    )}
  </AuthUserContext.Consumer>
)

export default withAuthorization(CreateReview)
