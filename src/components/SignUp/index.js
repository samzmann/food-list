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
    const { email, password } = this.state

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log('sign up successful!', authUser)
        this.setState({...INITIAL_STATE})
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

    const { email, password, error } = this.state

    const isInvalid = email === '' || password === ''

    return (
      <form onSubmit={this.onSubmit}>
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
