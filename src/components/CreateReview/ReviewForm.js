import React from 'react'
import moment from 'moment'

const INITIAL_STATE = {
  title: '',
  restaurantName: '',
  date: moment().format('YYYY-MM-DD'),
  description: '',
}

class ReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { title, restaurantName, date, description } = this.state
    const isInvalid = title === '' || restaurantName === '' || description === ''

    console.log(this.state)
    return(
      <form style={{ flex: 1, flexDirection: 'column' }}>

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

      </form>
    )
  }

}

export default ReviewForm
