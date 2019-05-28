import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import {connect} from 'react-redux'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import { setUserFromDB } from '../../interactions/actions/user'

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  error: null,
}

class SignUpForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {...INITIAL_STATE}
  }

  onSubmit = (event) => {
    const { username, email, password } = this.state
    const { firebase, setUser } = this.props

    firebase.doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log('sign up successful!', authUser)
        this.setState({...INITIAL_STATE})

        firebase.createUser(authUser.user.uid, {
          email,
          username,
          restaurants: [],
          reviews: [],
        })
          .then(() => {
            firebase.getUser(authUser.user.uid)
              .then(user => {
                console.log('account created!', user.data())
                setUser(user.data())
                this.props.history.push(ROUTES.PROFILE)
              })
              .catch(error => {
                console.log(error)
                this.setState({ error })
              })

          })
          .catch(error => {
            console.log(error)
            this.setState({ error })
          })
      })
      .catch(error => {
        console.log(error)
        this.setState({ error })
      })

    event.preventDefault()
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { username, email, password, error } = this.state
    const isInvalid = username === '' || email === '' || password === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Username"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="email"
          placeholder="Email"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="text"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error &&
        <p>{error.message}</p>
        }
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUserFromDB(user)),
})

export default compose(
  connect(null, mapDispatchToProps),
  withRouter,
  withFirebase,
)(SignUpForm)
