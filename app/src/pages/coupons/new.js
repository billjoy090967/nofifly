import React from 'react'
import withRoot from '../../components/withRoot'
import withDrawer from '../../components/withDrawer'
import MenuAppBar from '../../components/menuAppBar'
import CouponForm from '../../components/coupon-form'
import { connect } from 'react-redux'
import { createCoupon, isActive } from '../../action-creators/coupons'
import { UPDATE_NEW_COUPON_FORM } from '../../constants'

class NewCoupon extends React.Component {
  componentDidMount() {
    this.props.isSubmitActive()
  }
  render() {
    return (
      <div>
        <MenuAppBar title="Add a Coupon!" search goBack {...this.props} />
        <CouponForm
          coupon={this.props.coupon}
          onChange={this.props.onChange}
          onSubmit={this.props.onSubmit(this.props.coupon, this.props.history)}
        />
      </div>
    )
  }
}

const mapStateToProps = state => state

const mapActionsToProps = dispatch => {
  return {
    onChange: (field, value) => {
      dispatch({ type: UPDATE_NEW_COUPON_FORM, payload: { [field]: value } })
      dispatch(isActive)
    },
    onSubmit: (data, history) => e => {
      dispatch(createCoupon(data, history))
    },
    isSubmitActive: () => dispatch(isActive)
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default withRoot(withDrawer(connector(NewCoupon)))
