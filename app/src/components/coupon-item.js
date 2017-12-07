import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'

const CouponItem = props => {
  return (
    <div key={props._id}>
      <Link
        to={`/coupons/${props._id}`}
        style={{ textDecoration: 'none' }}
        className="link"
      >
        <ListItem button>
          <ListItemText primary={props.name} secondary={props.description} />
        </ListItem>
      </Link>
      <Divider />
    </div>
  )
}

export default CouponItem
