import React from 'react'
import withRoot from '../../components/withRoot'
import withDrawer from '../../components/withDrawer'
import MenuAppBar from '../../components/menuAppBar'

import { connect } from 'react-redux'
import { map, sortBy, prop } from 'ramda'
import List from 'material-ui/List'
import UserItem from '../../components/user-item'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import { Link } from 'react-router-dom'
import { setUsers } from '../../action-creators/users'

const sorter = sortBy(prop('email'))

// props.users === []
class Users extends React.Component {
  componentDidMount() {
    // console.log(this.props)
    this.props.onMount()
  }

  render() {
    return (
      <div>
        <MenuAppBar title="Users" search />
        <List style={{ padding: 0, marginBottom: 60 }}>
          {map(UserItem, sorter(this.props.users))}
        </List>
        <Link to="/users/new">
          <Button fab color="primary" aria-label="add" className="fab-button">
            <AddIcon />
          </Button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { users: state.users }
}
const mapActionsToProps = dispatch => {
  return {
    onMount: () => {
      dispatch(setUsers)
    }
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default withRoot(withDrawer(connector(Users)))
