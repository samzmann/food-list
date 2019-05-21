import React from 'react'

import AuthUserContext from './context'
import { withFirebase } from '../Firebase'

const withAuthentication = Component => {
  class withAuthentication extends React.Component {
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
        <AuthUserContext.Provider value={authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(withAuthentication)
}

export default withAuthentication
