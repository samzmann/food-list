import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import SignInForm from './SignInForm'

const SignIn = () => (
  <div>
    <h3>Sign in</h3>
    <SignInForm />
    <SignUpLink />
  </div>
)

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
)

export default SignIn
