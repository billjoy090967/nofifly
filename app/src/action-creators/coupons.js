import fetch from 'isomorphic-fetch'
import {
  SET_COUPONS,
  SET_CURRENT_COUPON,
  SET_EDIT_COUPON,
  UPDATE_NEW_COUPON_FORM,
  IS_ACTIVE,
  ERROR,
  ONCHANGE_EDIT_COUPON_FORM,
  CONFIRM_COUPON_DELETE,
  COUPONS_BY_EMAIL
} from '../constants'
import { isEmpty, assoc } from 'ramda'
import history from '../history'
const url = process.env.REACT_APP_BASE_URL

export const setCoupons = async (dispatch, getState) => {
  const response = await fetch(`${url}/coupons`).then(res => res.json())
  dispatch({ type: SET_COUPONS, payload: response })
}
export const deleteCoupon = id => async (dispatch, getState) => {
  const response = await fetch(`${url}/coupons/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE'
  }).then(res => res.json())
  if (!response.ok) {
    dispatch({ type: CONFIRM_COUPON_DELETE })
    return
  }
  dispatch({
    type: SET_CURRENT_COUPON,
    payload: {}
  })
  history.push('/coupons')
}

export const setCurrentCoupon = id => async (dispatch, getState) => {
  const response = await fetch(`${url}/coupons/${id}`).then(res => res.json())
  dispatch({
    type: SET_CURRENT_COUPON,
    payload: assoc('confirmDelete', false, response)
  })
}

export const couponsByEmail = userId => async (dispatch, getState) => {
  userId = 'user_' + userId
  const response = await fetch(`${url}/coupons/users/${userId}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  }).then(res => res.json())
  console.log('response', response)
  dispatch({ type: COUPONS_BY_EMAIL, payload: response })
}

export const createCoupon = (data, history) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const method = 'POST'
  const body = JSON.stringify(data)

  const result = await fetch(`${url}/coupons`, {
    headers,
    method,
    body
  }).then(res => res.json())

  if (result.ok) {
    // dispatch(setCoupons)
    // dispatch({ type: IS_ACTIVE, payload: true })
    history.push('/coupons/billjoy090967@gmail.com')
  } else {
    // handle error
  }
}

export const setEditCoupon = id => async (dispatch, getState) => {
  const response = await fetch(`${url}/coupons/${id}`).then(res => res.json())
  dispatch({ type: SET_EDIT_COUPON, payload: response })
  dispatch(isActive)
}

export const updateCoupon = (data, history) => async (dispatch, getState) => {
  const headers = { 'Content-Type': 'application/json' }

  const method = 'PUT'
  const body = JSON.stringify(data)

  const result = await fetch(`${url}/coupons/${data._id}`, {
    headers,
    method,
    body
  }).then(res => res.json())

  if (result.ok) {
    // dispatch(setCoupons)
    history.push('/coupons/billjoy090967@gmail.com')
  } else {
  }
}
export const onChangeEditCouponForm = (field, value) => (
  dispatch,
  getState
) => {
  dispatch({ type: ONCHANGE_EDIT_COUPON_FORM, payload: { [field]: value } })
}

export const isActive = async (dispatch, getState) => {
  const currentData = !isEmpty(getState().coupon.name)
    ? getState().coupon
    : getState().editCoupon
  const {
    userID,
    type,
    category,
    name,
    description,
    deal,
    expirationDate
  } = currentData
  if (
    isEmpty(userID) ||
    isEmpty(type) ||
    isEmpty(category) ||
    isEmpty(name) ||
    isEmpty(description) ||
    isEmpty(deal) ||
    isEmpty(expirationDate)
  ) {
    dispatch({ type: IS_ACTIVE, payload: true })
  } else {
    dispatch({ type: IS_ACTIVE, payload: false })
  }
}
