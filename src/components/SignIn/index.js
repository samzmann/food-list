import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'

const SignIn = () => (
  <div>
    <h3>Sign in</h3>
    <SignInForm />
    <SignUpLink />
  </div>
)

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
}

class SignInFormBase extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { email, password } = this.state

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log('login successful!', authUser)
        this.setState({ ...INITIAL_STATE })
        this.props.history.push(ROUTES.PROFILE)
      })

    event.preventDefault()
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { email, password, error } = this.state
    const isInvalid = email === '' || password === ''

    return(
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="email"
          placeholder="Email address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="text"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error &&
          <p>{error.message}</p>
        }
      </form>
    )
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase)

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
)

export default SignIn
