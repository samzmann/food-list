import React from 'react'
import ReviewForm from './ReviewForm'
import { withAuthorization } from '../Session'

const CreateReview = () => (
  <div>
    <h3>Create a new review</h3>
    <ReviewForm />
  </div>
)

export default withAuthorization(CreateReview)
