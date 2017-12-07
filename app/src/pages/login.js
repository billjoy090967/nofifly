import React from 'react'
import withRoot from '../components/withRoot'
import withDrawer from '../components/withDrawer'
import MenuAppBar from '../components/menuAppBar'
import UserLogin from '../components/user-login'
import { connect } from 'react-redux'
import {
  updateNewUserForm,
  addNewUser,
  isActive
} from '../action-creators/users'
import { UPDATE_NEW_USER_FORM } from '../constants'

// props.users === []
class NewUser extends React.Component {
  componentDidMount() {
    this.props.isSubmitActive()
  }
  render() {
    return (
      <div>
        <MenuAppBar title="Login Now!" search goBack {...this.props} />
        <UserLogin {...this.props} />
      </div>
    )
  }
}

const mapStateToProps = state => state

const mapActionsToProps = dispatch => {
  return {
    onChange: (field, value) => {
      dispatch({ type: UPDATE_NEW_USER_FORM, payload: { [field]: value } })
      dispatch(isActive)
    },
    addNewUser: e => {
      e.preventDefault()
      dispatch(addNewUser)
    },
    isSubmitActive: () => dispatch(isActive)
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default withRoot(withDrawer(connector(NewUser)))
