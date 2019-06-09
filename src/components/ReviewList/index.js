import React, { useState, useContext, useEffect } from 'react'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
import AuthUserContext from '../Session/context'
import ReviewCard from '../ReviewCard'

const ReviewList = (props) => {
  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState([])
  const authUser = useContext(AuthUserContext)

  useEffect(() => {
    console.log('mount')
    props.firebase.getReviewsByUserId(authUser.uid)
      .then(snapshot => {
        setReviews(snapshot.docs)
        setLoading(false)
      })
      .catch(console.log)
    return () => {
      console.log('unmount')
    }
  }, [])

  return (
    <div>
      <p>here are some reviews</p>
      {reviews.map(reviewDocument => (
        <ReviewCard review={reviewDocument.data()} />
      ))}
    </div>
  )
}

export default compose(
  withFirebase,
)(ReviewList)
