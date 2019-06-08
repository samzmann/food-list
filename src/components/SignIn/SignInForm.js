import React, { useState, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import * as ROUTES from '../../constants/routes'
import { withFirebase } from '../Firebase'
import { UserContext } from '../../state/user'

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
}

const SignInForm = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { user, setUser } = useContext(UserContext)

  console.log('email', email)


  const onSubmit = event => {
    const { firebase, history } = props

    firebase.doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log('login successful!', authUser)
        firebase.getUser(authUser.user.uid)
          .then(user => {
            setUser(user.data())
            setEmail('')
            setPassword('')
            setError(null)
            history.push(ROUTES.PROFILE)
          })
          .catch(error => {
            console.log(error)
            setError(error)
          })
      })
      .catch(error => {
        console.log(error)
        setError(error)
      })

    event.preventDefault()
  }

  const isInvalid = email === '' || password === ''

  return(
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
        placeholder="Email address"
      />
      <input
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
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

export default compose(
  withRouter,
  withFirebase,
)(SignInForm)
