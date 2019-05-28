import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import { setUserFromDB } from '../../interactions/actions/user'

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
    const { firebase, setUser } = this.props

    firebase.doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log('login successful!', authUser)
        firebase.getUser(authUser.user.uid)
          .then(user => {
            setUser(user.data())
            this.setState({ ...INITIAL_STATE })
            this.props.history.push(ROUTES.PROFILE)
          })
          .catch(err => {
            console.log(err)
            this.setState({ err })
          })
      })
      .catch(err => {
        console.log(err)
        this.setState({ err })
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

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUserFromDB(user))
})

const SignInForm = compose(
  connect(null, mapDispatchToProps),
  withRouter,
  withFirebase,
)(SignInFormBase)

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
)

export default SignIn
