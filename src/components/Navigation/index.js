import React from 'react'
import  { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import SignOutButton from '../SignOut'
import { AuthUserContext } from '../Session'

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNoAuth />
      }
    </AuthUserContext.Consumer>
  </div>
)

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.PROFILE}>Profile</Link>
    </li>
    <li>
      <Link to={ROUTES.CREATE_REVIEW}>Create review</Link>
    </li>
    <li>
      <SignOutButton/>
    </li>
  </ul>
)

const NavigationNoAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign in</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_UP}>Sign up</Link>
    </li>
  </ul>
)

export default Navigation
