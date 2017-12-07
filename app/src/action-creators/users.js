import fetch from 'isomorphic-fetch'
import {
  SET_USERS,
  SET_CURRENT_USER,
  SET_EDIT_USER,
  UPDATE_NEW_USER_FORM,
  ERROR,
  IS_ACTIVE,
  SUBMIT_EDIT_USER_FORM,
  ONCHANGE_EDIT_USER_FORM,
  ADD_NEW_USER
} from '../constants'
import history from '../history'
import { isEmpty, assoc } from 'ramda'
const url = process.env.REACT_APP_BASE_URL

export const setUsers = async (dispatch, getState) => {
  const response = await fetch(`${url}/users`).then(res => res.json())
  dispatch({ type: SET_USERS, payload: response })
}

export const setCurrentUser = id => async (dispatch, getState) => {
  const response = await fetch(`${url}/users/${id}`).then(res => res.json())
  dispatch({
    type: SET_CURRENT_USER,
    payload: assoc('confirmDelete', false, response)
  })
}

export const updateNewUserForm = (field, value) => (dispatch, getState) => {
  dispatch({ type: UPDATE_NEW_USER_FORM, payload: { [field]: value } })
}

export const onChangeEditUserForm = (field, value) => (dispatch, getState) => {
  dispatch({ type: ONCHANGE_EDIT_USER_FORM, payload: { [field]: value } })
}

export const addNewUser = async (dispatch, getState) => {
  const user = getState().user
  const response = await fetch(`${url}/users`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(user)
  }).then(res => res.json())

  if (!response.ok) {
    dispatch({ type: ERROR, payload: 'Could not add user' })
    return
  }
  dispatch(setUsers)

  history.push('/users')
}

export const setEditUser = id => async (dispatch, getState) => {
  const response = await fetch(`${url}/users/${id}`).then(res => res.json())
  dispatch({ type: SET_EDIT_USER, payload: response })
  dispatch(isActive)
}

export const updateUser = data => async (dispatch, getState) => {
  const headers = { 'Content-Type': 'application/json' }
  const method = 'PUT'
  const body = JSON.stringify(data)

  const result = await fetch(`${url}/users/${data._id}`, {
    headers,
    method,
    body
  }).then(res => res.json())

  if (result.ok) {
    dispatch(setUsers)

    history.push('/users/' + data._id)
  } else {
  }
}

export const isActive = async (dispatch, getState) => {
  const currentData = !isEmpty(getState()user.email)
    ? getState().user
    : getState().editUser
  const { type, firstName, lastName, email, zipcode } = currentData

  if (
    isEmpty(type) ||
    isEmpty(firstName) ||
    isEmpty(lastName) ||
    isEmpty(email) ||
    isEmpty(zipcode)
  ) {
    dispatch({ type: IS_ACTIVE, payload: true })
  } else {
    dispatch({ type: IS_ACTIVE, payload: false })
  }
}
