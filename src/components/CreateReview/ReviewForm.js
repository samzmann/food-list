import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'

const ReviewForm = (props) => {
  const [title, setTitle] = useState('')
  const [restaurantName, setRestaurantName] = useState('')
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onSubmit = (event) => {
    event.preventDefault()

    const { firebase, authUser } = props

    setLoading(true)
    setError(false)

    const newReview = {
      userId: authUser.uid,
      title,
      restaurantName,
      date,
      description
    }

    firebase.createReview(newReview)
      .then(doc => {
        console.log(doc)
        setTitle('')
        setRestaurantName('')
        setDate(moment().format('YYYY-MM-DD'))
        setDescription('')
        setLoading(false)
        setError(null)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
        setError('There was some sort of error 😵')
      })
  }

  const isInvalid = title === '' || restaurantName === '' || description === ''

  return(
    <form
      onSubmit={onSubmit}
      style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
    >

      <label>Title</label>
      <input
        name="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        type="text"
      />
      <br/>

      <label>Restaurant name</label>
      <input
        name="restaurantName"
        value={restaurantName}
        onChange={e => setRestaurantName(e.target.value)}
        type="text"
      />
      <br/>

      <label>Date</label>
      <input
        name="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        type="date"
      />
      <br/>

      <label>Description</label>
      <textarea
        name="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <br/>

      <button disabled={isInvalid} type="submit">
        Sign In
      </button>

      {error &&
        <p>{error}</p>
      }

    </form>
  )

}

export default compose(
  withRouter,
  withFirebase,
)(ReviewForm)
