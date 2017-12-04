import React from 'react'
import withRoot from '../../components/withRoot'
import withDrawer from '../../components/withDrawer'
import MenuAppBar from '../../components/menuAppBar'
import CouponForm from '../../components/coupon-edit'
import { connect } from 'react-redux'

import {
  updateCoupon,
  isActive,
  setEditCoupon
} from '../../action-creators/coupons'
import { ONCHANGE_EDIT_COUPON_FORM } from '../../constants'

class EditCoupon extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.setEditCoupon(id)
    // this.props.isSubmitActive()
  }
  render() {
    return (
      <div>
        <MenuAppBar title="Edit Your Coupon" search goBack {...this.props} />
        <CouponForm isActive={this.props.isActive} {...this.props} />
      </div>
    )
  }
}

const mapStateToProps = state => state

const mapActionsToProps = dispatch => {
  return {
    onChange: (field, value) => {
      dispatch({ type: ONCHANGE_EDIT_COUPON_FORM, payload: { [field]: value } })
      dispatch(isActive)
    },
    updateCoupon: data => e => {
      e.preventDefault()
      dispatch(updateCoupon(data))
    },
    setEditCoupon: id => dispatch(setEditCoupon(id)),
    isSubmitActive: () => dispatch(isActive)
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default withRoot(withDrawer(connector(EditCoupon)))
