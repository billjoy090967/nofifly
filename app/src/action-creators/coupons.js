import fetch from 'isomorphic-fetch'
import {
  SET_COUPONS,
  SET_CURRENT_COUPON,
  SET_EDIT_COUPON,
  ERROR,
  IS_ACTIVE,
  CONFIRM_COUPON_DELETE
} from '../constants'
import history from '../history'
import { isEmpty, assoc } from 'ramda'

const url = process.env.REACT_APP_BASE_URL
export const setCoupons = async (dispatch, getState) => {
  const response = await fetch(`${url}/coupons`).then(res => res.json())
  dispatch({ type: SET_COUPONS, payload: response })
}

export const setCurrentCoupon = id => async (dispatch, getState) => {
  const response = await fetch(`${url}/coupons/${id}`).then(res => res.json())
  dispatch({
    type: SET_CURRENT_COUPON,
    payload: assoc('confirmDelete', false, response)
  })
}

export const deleteCoupon = id => async (dispatch, getState) => {
  const response = await fetch(`${url}/coupons/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE'
  }).then(res => res.json())
  console.log('response', response)
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

export const createCoupon = async (dispatch, getState) => {
  const coupon = getState().coupon
  const response = await fetch(`${url}/coupons`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(coupon)
  }).then(res => res.json())

  if (!response.ok) {
    dispatch({ type: ERROR, payload: 'Could not add coupon' })
    return
  }
  dispatch(setCoupons)

  history.push('/coupons')
}

export const setEditCoupon = id => async (dispatch, getState) => {
  const response = await fetch(`${url}/coupons/${id}`).then(res =>
    res.json().catch(err => console.log('err', err))
  )
  console.log('response', response)
  dispatch({ type: SET_EDIT_COUPON, payload: response })
  dispatch(isActive)
}

export const updateCoupon = data => async (dispatch, getState) => {
  const headers = { 'Content-Type': 'application/json' }
  const method = 'PUT'
  const body = JSON.stringify(data)

  const result = await fetch(`${url}/coupons/${data._id}`, {
    headers,
    method,
    body
  }).then(res => res.json())

  if (result.ok) {
    dispatch(setCoupons)

    history.push('/coupons/' + data._id)
  } else {
  }
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
