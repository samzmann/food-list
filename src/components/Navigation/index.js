import React from 'react'
import  { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import SignOutButton from '../SignOut'

const Navigation = ({ authUser }) => (
  <div>
    {authUser ? <NavigationAuth /> : <NavigationNoAuth />}
  </div>
)

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.PROFILE}>Profile</Link>
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
