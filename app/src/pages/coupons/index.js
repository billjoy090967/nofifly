import React from 'react'
import withRoot from '../../components/withRoot'
import withDrawer from '../../components/withDrawer'
import MenuAppBar from '../../components/menuAppBar'

import Typography from 'material-ui/Typography'
import List from 'material-ui/List'

import { connect } from 'react-redux'
import EnhancedTable from '../../components/enhanced-table'
import { couponsByEmail } from '../../action-creators/coupons'
import addCoupon from '../../media/images/add-a-coupon.jpg'
import history from '../../history'

class Coupons extends React.Component {
  componentDidMount() {
    this.props.onMount(this.props.match.params.id)
  }

  render() {
    return (
      <div>
        <MenuAppBar title="My Coupons" account />
        <Typography />
        <List style={{ padding: 0, marginBottom: 5 }}>
          <EnhancedTable couponsByEmailData={this.props.state.couponsByEmail} />
        </List>
        <img
          alt="AddGraphic"
          src={addCoupon}
          width="150"
          height="auto"
          style={{ position: 'absolute', right: '43%' }}
          onClick={e => history.push('/coupons/new')}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { coupons: state.coupons, state: state }
}
const mapActionsToProps = dispatch => {
  return {
    onMount: userId => {
      dispatch(couponsByEmail(userId))
    }
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default withRoot(withDrawer(connector(Coupons)))
