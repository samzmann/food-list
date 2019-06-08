import React from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'

const INITIAL_STATE = {
  title: '',
  restaurantName: '',
  date: moment().format('YYYY-MM-DD'),
  description: '',
  loading: false,
  error: null,
}

class ReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit = (event) => {
    event.preventDefault()

    const { title, restaurantName, date, description } = this.state
    const { firebase, authUser } = this.props

    this.setState({ loading: true, error: null })

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
        this.setState({ ...INITIAL_STATE })
      })
      .catch(error => {
        console.log(error)
        this.setState({ loading: false, error: 'There was some sort of error 😵' })
      })
  }

  render() {
    const { title, restaurantName, date, description, error } = this.state
    const isInvalid = title === '' || restaurantName === '' || description === ''

    return(
      <form
        onSubmit={this.onSubmit}
        style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
      >

        <label>Title</label>
        <input
          name="title"
          value={title}
          onChange={this.onChange}
          type="text"
        />
        <br/>

        <label>Restaurant name</label>
        <input
          name="restaurantName"
          value={restaurantName}
          onChange={this.onChange}
          type="text"
        />
        <br/>

        <label>Date</label>
        <input
          name="date"
          value={date}
          onChange={this.onChange}
          type="date"
        />
        <br/>

        <label>Description</label>
        <textarea
          name="description"
          value={description}
          onChange={this.onChange}
          type="text"
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

}

export default compose(
  withRouter,
  withFirebase,
)(ReviewForm)
