import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../../interactions/reducers'

import Navigation from '../Navigation'
import SignInPage from '../SignIn'
import SignUpPage from '../SignUp'
import Profile from '../Profile'
import CreateReview from '../CreateReview'

import * as ROUTES from '../../constants/routes'
import { withAuthentication } from '../Session'

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

const App = () => (
    <Provider store={store}>
        <Router>
            <Navigation />

            <hr />

            <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.PROFILE} component={Profile} />
            <Route path={ROUTES.CREATE_REVIEW} component={CreateReview} />
        </Router>
    </Provider>
)

export default withAuthentication(App)
