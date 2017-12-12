import { createStore, combineReducers, applyMiddleware } from 'redux'
import { drawer } from './reducers/drawer'
import { users, currentUser, newUser, editUser } from './reducers/users'
import {
  coupons,
  currentCoupon,
  coupon,
  editCoupon,
  couponsByEmail,
  isActive
} from './reducers/coupons'
import thunk from 'redux-thunk'

const store = createStore(
  combineReducers({
    drawer,
    coupons,
    users,
    currentCoupon,
    currentUser,
    coupon,
    editCoupon,
    newUser,
    editUser,
    isActive,
    couponsByEmail
  }),
  applyMiddleware(thunk)
)
store.subscribe(() => {})
export default store
