import { connect } from 'react-redux'
import { setUserFromDB } from '../../interactions/actions/user'
import SignUp from './SignUp'

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUserFromDB(user)),
})

export default connect(null, mapDispatchToProps)(SignUp)
