import React from 'react'
import withRoot from '../../components/withRoot'
import withDrawer from '../../components/withDrawer'
import MenuAppBar from '../../components/menuAppBar'
import EditCouponForm from '../../components/coupon-edit'
import { connect } from 'react-redux'
import {
  updateCoupon,
  setEditCoupon,
  isActive,
  onChangeEditCouponForm,
  setCoupons
} from '../../action-creators/coupons'

class EditCoupon extends React.Component {
  componentDidMount() {
    //this.props.onMount()
    const id = this.props.match.params.id
    this.props.setEditCoupon(id)
    // this.props.isSubmitActive()
  }
  render() {
    return (
      <div>
        <MenuAppBar title="Edit Your Coupon" search goBack {...this.props} />
        <EditCouponForm
          onChange={this.props.onChange}
          editCoupon={this.props.editCoupon}
          onSubmit={this.props.onSubmit(
            this.props.editCoupon,
            this.props.history
          )}
          isActive={this.props.isActive}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    editCoupon: state.editCoupon,
    isActive: state.isActive,
    users: state.users
  }
}

const mapActionsToProps = dispatch => {
  return {
    onChange: (field, value) => {
      dispatch(onChangeEditCouponForm(field, value))
      dispatch(isActive)
    },
    onSubmit: (data, history) => e => {
      dispatch(updateCoupon(data, history))
    },
    onMount: () => dispatch(setCoupons),
    setEditCoupon: id => dispatch(setEditCoupon(id)),
    isSubmitActive: () => dispatch(isActive)
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default withRoot(withDrawer(connector(EditCoupon)))
