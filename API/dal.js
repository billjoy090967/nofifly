const { assoc } = require('ramda')
const pkGenerator = require('./lib/build-pk')
const {
  get,
  create,
  update,
  find,
  deleteDoc,
  allDocs
} = require('./lib/dal-helper')

const getAllCoupons = options => allDocs(options || { include_docs: true })

const createUser = user => {
  user._id = pkGenerator('user_', user.email)
  return create(user)
}
const getUser = id => get(id)
const updateUser = user => update(user)

const getCoupon = id => get(id)
const createCoupon = doc => {
  const id = pkGenerator('coupon_', doc.name.expirationDate)
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
  findCoupon,
  updateCoupon,
  deleteCoupon,
  getAllCoupons,
  checkCouponId
}
module.exports = dal
