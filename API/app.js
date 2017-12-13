require('dotenv').config()

const express = require('express')
const app = express()
const {
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
} = require('./dal')
const port = process.env.PORT || 5000
const HTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const {
  propOr,
  pathOr,
  compose,
  not,
  isEmpty,
  is,
  prop,
  omit,
  merge,
  __,
  join,
  path,
  split,
  trim,
  last,
  toLower
} = require('ramda')
const checkRequiredFields = require('./lib/check-required-fields')
const cors = require('cors')

const postUserRequiredFieldCheck = checkRequiredFields([
  'firstName',
  'lastName',
  'email',
  'zipcode'
])
const putUserRequiredFieldCheck = checkRequiredFields(['_id', '_rev'])
const couponRequiredFieldCheck = checkRequiredFields([
  'category',
  'name',
  'expirationDate'
])

const couponRequiredPutFieldCheck = checkRequiredFields(['_id', '_rev'])

app.use(cors({ credentials: true }))
app.use(bodyParser.json())

app.get('/', (req, res, next) => res.send('Welcome to the api.'))

/// //////////////
///  Users
/// /////////////

app.post('/users', (req, res, next) => {
  if (isEmpty(prop('body', req))) {
    return next(
      new HTTPError(
        400,
        'Missing request body.  Content-Type header should be application/json.'
      )
    )
  }

  const body = compose(
    omit(['_id', '_rev']),
    merge(__, { type: 'user' }),
    prop('body')
  )(req)

  const missingFields = postUserRequiredFieldCheck(body)

  if (not(isEmpty(missingFields))) {
    return next(
      new HTTPError(400, `Missing required fields: ${join(' ', missingFields)}`)
    )
  }

  createUser(body)
    .then(result => res.status(201).send(result))
    .catch(err => next(new HTTPError(err.status, err.message)))
})

app.get('/users/:id', (req, res, next) => {
  getUser(path(['params', 'id'], req))
    .then(doc => res.status(200).send(doc))
    .catch(err => next(new HTTPError(err.status, err.message)))
})

app.delete('/users/:id', (req, res, next) => {
  deleteUser(path(['params', 'id'], req))
    .then(result => res.status(200).send(result))
    .catch(err => next(new HTTPError(err.status, err.message)))
})

app.put('/users/:id', (req, res, next) => {
  if (isEmpty(prop('body'), req)) {
    return next(
      new HTTPError(
        400,
        'Missing request body. Content-Type header must be application/json'
      )
    )
  }

  const missingFields = putUserRequiredFieldCheck(prop('body', req))
  if (not(isEmpty(missingFields))) {
    return next(
      new HTTPError(400, `Missing required fields: ${join(' ', missingFields)}`)
    )
  }

  updateUser(prop('body', req))
    .then(result => res.status(200).send(result))
    .catch(err => next(new HTTPError(err.status, err.message)))
})
app.get('/users', (req, res, next) => {
  getAllUsers({
    include_docs: true,
    inclusive_end: true,
    start_key: 'user_',
    end_key: 'user_\ufff0'
  })
    .then(docs => {
      res.status(200).send(docs)
    })
    .catch(err => next(new HTTPError(err.status, err.message)))
})
// app.get('/users', (req, res, next) => {
//   let searchStr = compose(split(':'), pathOr('', ['query', 'filter']))(req)
//   const filter = pathOr(null, ['query', 'filter'])(req)
//   var options = {}
//   if (filter) {
//     options = {
//       include_docs: true,
//       startkey: 'user_' + last(searchStr),
//       endkey: 'user_' + last(searchStr) + '\ufff0'
//     }
//   } else {
//     options = {
//       include_docs: true,
//       startkey: 'user_',
//       endkey: 'user_\ufff0'
//     }
//   }
// })

/// //////////////////
/// //// coupons
/// //////////////////

app.post('/coupons', (req, res, next) => {
  // TODO: remove this when auth is hooked up
  // req.body.email = 'foo@bar.com'
  if (isEmpty(prop('body'), req)) {
    return next(
      new HTTPError(
        400,
        'Missing request body.  Content-Type header should be application/json.'
      )
    )
  }

  const body = compose(
    omit(['_id', '_rev']),
    merge(__, { type: 'coupon' }),
    prop('body')
  )(req)

  const missingFields = couponRequiredFieldCheck(body)
  if (not(isEmpty(missingFields))) {
    return next(
      new HTTPError(400, `Missing required fields: ${join(' ', missingFields)}`)
    )
  }

  createCoupon(body)
    .then(result => {
      //console.log('in then: ', result)
      res.status(201).send(result)
    })
    .catch(err => next(new HTTPError(err.status, err.message)))
})

app.get('/coupons/:id', (req, res, next) => {
  getCoupon(req.params.id)
    .then(result => res.status(200).send(result))
    .catch(err => next(err => new HTTPError(err.status, err.message)))
})

app.put('/coupons/:id', (req, res, next) => {
  if (isEmpty(prop('body'), req)) {
    return next(
      new HTTPError(
        400,
        'Missing request body.  Content-Type header should be application/json.'
      )
    )
  }
  const missingFields = couponRequiredPutFieldCheck(prop('body', req))
  if (not(isEmpty(missingFields))) {
    return next(
      new HTTPError(401, `Missing required fields: ${join(' ', missingFields)}`)
    )
  }

  updateCoupon(req.body)
    .then(result => res.status(200).send(result))
    .catch(err => next(err => new HTTPError(err.status, err.message)))
})

app.delete('/coupons/:id', (req, res, next) => {
  deleteCoupon(path(['params', 'id'], req))
    .then(result => res.status(200).send(result))
    .catch(err => next(new HTTPError(err.status, err.message)))
})

app.get('/coupons/users/:userId', (req, res, next) => {
  getCouponsByEmail(req.params.userId)
    .then(docs => {
      res.status(200).send(docs)
    })
    .catch(err => next(new HTTPError(err.status, err.message)))
})

/// //////////////////
/// // Error Handler
/// //////////////////

app.use(function(err, req, res, next) {
  console.log(req.method, ' ', req.path, ' ', 'error ', err)
  res.status(err.status || 500).send(err)
})

app.listen(port, () => console.log('Im up and ready to go on port ', port))
