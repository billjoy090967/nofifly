const { assoc, toLower } = require('ramda')
const pkGenerator = require('./lib/build-pk')
const {
  get,
  create,
  update,
  deleteDoc,
  allDocs,
  findDocs
} = require('./lib/dal-helper')

const getAllCoupons = options => allDocs(options || { include_docs: true })
const getAllUsers = options => allDocs(options || { include_docs: true })
const getCouponsByEmail = userId =>
  findDocs({
    selector: {
      userId: {
        $eq: userId
      }
    }
  })

const createUser = user => {
  user._id = pkGenerator('user_', user.email)
  return create(user)
}
const getUser = id => get(id)
const deleteUser = id => deleteDoc(id)
const updateUser = user => update(user)

const getCoupon = id => get(id)
const createCoupon = doc => {
  doc.userId = 'user_' + 'billjoy090967@gmail.com'
  doc._id = pkGenerator(
    'coupon_',
    doc.email ||
      'billjoy090967@gmail.com' + '_' + doc.name + '_' + doc.expirationDate
  )
  return create(doc)
}
const updateCoupon = doc => update(doc)
const deleteCoupon = id => deleteDoc(id)

const dal = {
  createUser,
  getUser,
  updateUser,
  getAllUsers,
  deleteUser,
  createCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
  getAllCoupons,
  getCouponsByEmail
}
module.exports = dal
