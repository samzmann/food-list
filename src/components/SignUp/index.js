import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import * as ROUTES from '../../constants/routes'
import { withFirebase } from '../Firebase'

const SignUp = () => (
  <div>
    <h3>Sign up</h3>
    <SignUpForm />
  </div>
)

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  error: null,
}

class SignUpFormBase extends React.Component {
  constructor(props) {
    super(props)
    this.state = {...INITIAL_STATE}
  }

  onSubmit = event => {
    const { username, email, password } = this.state
    const { firebase } = this.props

    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log('sign up successful!', authUser)
        this.setState({...INITIAL_STATE})

        firebase.createUser({
          email,
          username,
          restaurants: [],
          reviews: [],
        })
          .then(doc => {
            console.log('account created!', doc.data())
          })
          .catch(err => {
            console.log('error creating account:', err)
          })

        this.props.history.push(ROUTES.PROFILE)
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

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase)

export default SignUp
