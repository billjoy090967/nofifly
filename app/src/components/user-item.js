import React from 'react'
import {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import EllipsisIcon from 'material-ui-icons/MoreVert'
import Divider from 'material-ui/Divider'
import { Link } from 'react-router-dom'
import { slice, toUpper, compose, toLower, join, split } from 'ramda'

const UserItem = user => {
  return (
    <div key={user._id}>
      <Link to={`/users/${user._id}`} className="router-link">
        <ListItem button>
          <ListItemAvatar>
            <Avatar>
              {compose(
                toUpper(),
                slice(0, 1),
                join(' '),
                split(' '),
                toLower()
              )(user.name)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={user.email}
            secondary={user.firstName.lastName}
          />
          <ListItemSecondaryAction>
            <IconButton aria-label="More">
              <EllipsisIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </Link>
      <Divider />
    </div>
  )
}
export default UserItem
