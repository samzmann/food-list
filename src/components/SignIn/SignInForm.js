import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import * as ROUTES from '../../constants/routes'
import { setUserFromDB } from '../../interactions/actions/user'
import { withFirebase } from '../Firebase'

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
}

class SignInForm extends React.Component {
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

export default compose(
  connect(null, mapDispatchToProps),
  withRouter,
  withFirebase,
)(SignInForm)
