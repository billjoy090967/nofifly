import React from 'react'
import withRoot from '../../components/withRoot'
import withDrawer from '../../components/withDrawer'
import MenuAppBar from '../../components/menuAppBar'

import Typography from 'material-ui/Typography'
import List from 'material-ui/List'

import { connect } from 'react-redux'
import EnhancedTable from '../../components/enhanced-table'
import { setCoupons } from '../../action-creators/coupons'
import addCoupon from '../../media/images/add-a-coupon.jpg'
import history from '../../history'

class Coupons extends React.Component {
  componentDidMount() {
    this.props.onMount()
  }

  render() {
    // ramda filter to filter the coupons
    // currently logged in user should be available as this.props.currentUser or whatever.
    return (
      <div>
        <MenuAppBar title="My Coupons" account />
        <Typography />
        <List style={{ padding: 0, marginBottom: 60 }}>
          <EnhancedTable coupons={this.props.coupons} />
        </List>
        <img
          alt="AddGraphic"
          src={addCoupon}
          width="150"
          height="auto"
          style={{ position: 'fixed', right: '45%' }}
          onClick={e => history.push('/coupons/new')}
        />
      </div>
    )
  }
}

// pull in the currently logged in user from state
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
