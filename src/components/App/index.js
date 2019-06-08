import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { UserProvider } from '../../state/user'

import Navigation from '../Navigation'
import SignInPage from '../SignIn'
import SignUpPage from '../SignUp'
import Profile from '../Profile'
import CreateReview from '../CreateReview'

import * as ROUTES from '../../constants/routes'
import { withAuthentication } from '../Session'

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navigation />

        <hr />

        <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.PROFILE} component={Profile} />
        <Route path={ROUTES.CREATE_REVIEW} component={CreateReview} />
      </Router>
    </UserProvider>
  )
}

export default withAuthentication(App)
