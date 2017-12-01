import {
  SET_USERS,
  SET_CURRENT_USER,
  UPDATE_NEW_USER_FORM,
  IS_ACTIVE,
  SET_EDIT_USER,
  ONCHANGE_EDIT_USER_FORM
} from '../constants'

import { merge, not } from 'ramda'

export const users = (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.payload
    default:
      return state
  }
}

export const currentUser = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.payload
  }
}

const newUserDefault = {
  type: '',
  firstName: '',
  lastName: '',
  email: '',
  zipcode: ''
}
export const newUser = (state = newUserDefault, action) => {
  switch (action.type) {
    case UPDATE_NEW_USER_FORM:
      console.log('ACTION', action.payload)
      console.log('STATE', state)
      return merge(state, action.payload)
    case SET_USERS:
      return newUserDefault
    default:
      return state
  }
}

export const editUser = (state = newUserDefault, action) => {
  switch (action.type) {
    case SET_EDIT_USER:
      return action.payload
    case ONCHANGE_EDIT_USER_FORM:
      return merge(state, action.payload)
    case SET_USERS:
      return newUserDefault
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
