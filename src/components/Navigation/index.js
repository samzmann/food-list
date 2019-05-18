import React from 'react'
import  { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import SignOutButton from '../SignOut'

const Navigation = () => (
  <div>
      <ul>
          <li>
              <Link to={ROUTES.SIGN_IN}>Sign in</Link>
          </li>
          <li>
              <Link to={ROUTES.SIGN_UP}>Sign up</Link>
          </li>
          <li>
              <Link to={ROUTES.PROFILE}>Profile</Link>
          </li>
          <li>
              <SignOutButton/>
          </li>
      </ul>
  </div>

)

export default Navigation
