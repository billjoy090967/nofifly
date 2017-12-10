import React from 'react'
import withRoot from '../../components/withRoot'
import withDrawer from '../../components/withDrawer'
import MenuAppBar from '../../components/menuAppBar'
import EditUserForm from '../../components/user-edit'
import { connect } from 'react-redux'
import {
  addEditUser,
  setEditUser,
  isActive,
  onChangeEditUserForm,
  setUsers
} from '../../action-creators/users'

// props.users === []
class EditUser extends React.Component {
  componentDidMount() {
    this.props.onMount()
    const id = this.props.match.params.id
    this.props.setEditUser(id)
    // this.props.isSubmitActive()
  }
  render() {
    return (
      <div>
        <MenuAppBar
          title="Edit My Account Info"
          search
          goBack
          {...this.props}
        />
        <EditUserForm
          onChange={this.props.onChange}
          editUser={this.props.editUser}
          onSubmit={this.props.onSubmit(
            this.props.editUser,
            this.props.history
          )}
          isActive={this.props.isActive}
          coupons={this.props.coupons}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    editUser: state.editUser,
    isActive: state.isActive,
    coupons: state.coupons
  }
}

const mapActionsToProps = dispatch => {
  return {
    onChange: (field, value) => {
      dispatch(onChangeEditUserForm(field, value))
      dispatch(isActive)
    },
    onSubmit: (data, history) => e => {
      dispatch(addEditUser(data, history))
    },
    onMount: () => dispatch(setUsers),
    setEditUser: id => dispatch(setEditUser(id)),
    isSubmitActive: () => dispatch(isActive)
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default withRoot(withDrawer(connector(EditUser)))
