import React from 'react'
import withRoot from '../../components/withRoot'
import withDrawer from '../../components/withDrawer'
import MenuAppBar from '../../components/menuAppBar'

import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import List from 'material-ui/List'

import { connect } from 'react-redux'
import { map } from 'ramda'
import AddIcon from 'material-ui-icons/Add'
import CouponItem from '../../components/coupon-item'
import { Link } from 'react-router-dom'
import { setCoupons } from '../../action-creators/coupons'

class Coupons extends React.Component {
  componentDidMount() {
    this.props.onMount()
  }

  render() {
    return (
      <div>
        <MenuAppBar title="My Coupons" search />
        <Typography />
        <List style={{ padding: 0, marginBottom: 60 }}>
          {map(CouponItem, this.props.coupons)}
        </List>
        <Link to="/coupons/new">
          <Button fab color="primary" aria-label="add" className="fab-button">
            <AddIcon />
          </Button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { coupons: state.coupons }
}
const mapActionsToProps = dispatch => {
  return {
    onMount: () => {
      dispatch(setCoupons)
    }
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default withRoot(withDrawer(connector(Coupons)))
