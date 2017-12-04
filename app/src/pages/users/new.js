import React from 'react'
import withRoot from '../../components/withRoot'
import withDrawer from '../../components/withDrawer'
import MenuAppBar from '../../components/menuAppBar'
import UserForm from '../../components/user-form'
import { connect } from 'react-redux'
import {
  updateNewUserForm,
  addNewUser,
  isActive
} from '../../action-creators/users'
import { setCoupons } from '../../action-creators/coupons'

// props.users === []
class NewUser extends React.Component {
  componentDidMount() {
    this.props.onMount()
    this.props.isSubmitActive()
  }
  render() {
    return (
      <div>
        <MenuAppBar title="Add User" search goBack {...this.props} />
        <UserForm
          onChange={this.props.onChange}
          newUser={this.props.newUser}
          onSubmit={this.props.onSubmit(this.props.newUser, this.props.history)}
          isActive={this.props.isActive}
          coupons={this.props.coupons}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    newUser: state.newUser,
    isActive: state.isActive,
    coupons: state.coupons
  }
}

const mapActionsToProps = dispatch => {
  return {
    onChange: (field, value) => {
      dispatch(updateNewUserForm(field, value))
      dispatch(isActive)
    },
    onSubmit: (data, history) => e => {
      dispatch(addNewUser(data, history))
    },
    onMount: () => {
      dispatch(setCoupons)
    },
    isSubmitActive: () => dispatch(isActive)
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default withRoot(withDrawer(connector(NewUser)))
