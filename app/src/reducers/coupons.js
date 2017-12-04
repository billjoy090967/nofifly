import {
  SET_COUPONS,
  SET_CURRENT_COUPON,
  UPDATE_NEW_COUPON_FORM,
  IS_ACTIVE,
  SET_EDIT_COUPON,
  ONCHANGE_EDIT_COUPON_FORM,
  CONFIRM_COUPON_DELETE
} from '../constants'
import { merge, not } from 'ramda'

export const coupons = (state = [], action) => {
  switch (action.type) {
    case SET_COUPONS:
      return action.payload
    default:
      return state
  }
}

export const currentCoupon = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_COUPON:
      return action.payload
    default:
      return state
    case CONFIRM_COUPON_DELETE:
      return merge(state, {
        confirmDelete: not(state.confirmDelete)
      })
  }
}

const setDefaultCoupon = {
  userId: '',
  type: '',
  category: '',
  name: '',
  deal: '',
  expirationDate: '',
  description: ''
}
export const coupon = (state = setDefaultCoupon, action) => {
  switch (action.type) {
    case UPDATE_NEW_COUPON_FORM:
      return merge(state, action.payload)
    case SET_COUPONS:
      return setDefaultCoupon
    default:
      return state
  }
}

export const editCoupon = (state = setDefaultCoupon, action) => {
  switch (action.type) {
    case SET_EDIT_COUPON:
      return action.payload
    case ONCHANGE_EDIT_COUPON_FORM:
      return merge(state, action.payload)
    case SET_COUPONS:
      return setDefaultCoupon
    default:
      return state
  }
}

export const isActive = (state = true, action) => {
  switch (action.type) {
    case IS_ACTIVE:
      return action.payload
    default:
      return state
  }
}
