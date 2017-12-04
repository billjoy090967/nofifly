import React from 'react'
import withRoot from '../../components/withRoot'
import withDrawer from '../../components/withDrawer'
import MenuAppBar from '../../components/menuAppBar'
import { connect } from 'react-redux'
import { pathOr } from 'ramda'
import { setCurrentUser, deleteUser } from '../../action-creators/users'
import UserCard from '../../components/user-card'
import Button from 'material-ui/Button'
import PhoneIcon from 'material-ui-icons/Phone'
import { Link } from 'react-router-dom'
import SecondaryMenu from '../../components/secondaryMenu'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'
import { CONFIRM_USER_DELETE } from '../../constants'
// props.users === []
class ShowUser extends React.Component {
  state = { expanded: false }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.setCurrentUser(id)
    //console.log('this.props', this.props)
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const currentID = pathOr('', ['currentUser', '_id'], this.props)

    const menuItemActions = [
      {
        name: 'Edit',
        link: `/users/${this.props.currentResource._id}/edit`,
        fn: null
      },
      {
        name: 'Delete',
        link: null,
        fn: this.props.toggleConfirmDelete
      }
    ]

    if (this.props.match.params.id === currentID) {
      return (
        <div>
          <MenuAppBar
            title={this.props.currentUser.email}
            search={true}
            goBack={'/users'}
            secondaryMenu={
              <SecondaryMenu actions={menuItemActions} {...this.props} />
            }
            {...this.props}
          />
          <UserCard data={this.props.currentUser} />
          <a href="tel:+1-978-793-2472">
            <Button
              fab
              color="secondary"
              aria-label="call"
              className="fab-button"
            >
              <PhoneIcon />
            </Button>
          </a>
          <Dialog
            open={this.props.currentUser.confirmDelete}
            onRequestClose={this.props.toggleConfirmDelete}
          >
            <DialogTitle>{'Delete'}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {'Are you sure you want to delete this user?'}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.toggleConfirmDelete} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() =>
                  this.props.deleteUser(this.props.currentUser._id)}
                color="primary"
                autoFocus
              >
                Confirm Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )
    } else {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  console.log('mapStateToProps: ', state)
  return {
    currentUser: state.currentUser
  }
}

const mapActionsToProps = dispatch => {
  return {
    setCurrentUser: id => dispatch(setCurrentUser(id)),
    toggleConfirmDelete: () => dispatch({ type: CONFIRM_USER_DELETE }),
    deleteUser: id => dispatch(deleteUser(id))
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)
export default withRoot(withDrawer(connector(ShowUser)))
