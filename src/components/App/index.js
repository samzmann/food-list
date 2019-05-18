import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navigation from '../Navigation'
import SignInPage from '../SignIn'
import SignUpPage from '../SignUp'
import Profile from '../Profile'

import * as ROUTES from '../../constants/routes'
import {withFirebase} from '../Firebase'

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      authUser: null,
    }
  }

  componentDidMount() {
    this.authListener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      console.log('auth state changed:', authUser)
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null })
    })
  }

  componentWillUnmount() {
    this.authListener()
  }

  render() {
    const { authUser } = this.state

    return (
      <Router>
        <Navigation authUser={authUser} />

        <hr />

        <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.PROFILE} component={Profile} />
      </Router>
    )
  }
}

export default withFirebase(App)
