import React from 'react'
import SignUpForm from './SignUpForm'

const SignUp = (props) => {
  const { setUser } = props
  return (
    <div>
      <h3>Sign up</h3>
      <SignUpForm />
    </div>
  )
}

export default SignUp
