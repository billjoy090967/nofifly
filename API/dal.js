const { assoc } = require('ramda')
const pkGenerator = require('./lib/build-pk')
const { get, create, update, deleteDoc, allDocs } = require('./lib/dal-helper')

const getAllCoupons = options => allDocs(options || { include_docs: true })

const createUser = user => {
  user._id = pkGenerator('user_', user.lastName.firstName)
  return create(user)
}
const getUser = id => get(id)
const updateUser = user => update(user)

const getCoupon = id => get(id)
const createCoupon = doc => {
  const id = pkGenerator('coupon_', doc.name)
  return create(assoc('_id', id, doc))
}
const updateCoupon = doc => update(doc)
const deleteCoupon = id => deleteDoc(id)

const checkCouponId = id => findCouponId(id)

const dal = {
  createUser,
  getUser,
  updateUser,
  createCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
  getAllCoupons,
  checkCouponId
}
module.exports = dal
