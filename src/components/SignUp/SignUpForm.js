import React, { useState, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import { UserContext } from '../../state/user'

const SignUpForm = (props) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { setUser } = useContext(UserContext)

  const onSubmit = (event) => {
    const { firebase, history } = props

    setError(null)

    firebase.doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log('sign up successful!', authUser)

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
                setUsername('')
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
      })
      .catch(error => {
        console.log(error)
        setError(error)
      })

    event.preventDefault()
  }

  const isInvalid = username === '' || email === '' || password === ''

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        type="text"
        placeholder="Username"
      />
      <input
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
      />
      <input
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
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

export default compose(
  withRouter,
  withFirebase,
)(SignUpForm)
