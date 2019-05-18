import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navigation from '../Navigation'
import SignInPage from '../SignIn'
import SignUpPage from '../SignUp'
import Profile from '../Profile'

import * as ROUTES from '../../constants/routes'

const App = () => (
    <Router>
        <Navigation />

        <hr />

        <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.PROFILE} component={Profile} />
    </Router>
)

export default App
