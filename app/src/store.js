import { createStore, combineReducers, applyMiddleware } from 'redux'
import { drawer } from './reducers/drawer'
import { users, currentUser, newUser, editUser } from './reducers/users'
import {
  coupons,
  currentCoupon,
  coupon,
  editCoupon,
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
    isActive
  }),
  applyMiddleware(thunk)
)
store.subscribe(() => {
  console.log('store.getState()', store.getState())
})
export default store
