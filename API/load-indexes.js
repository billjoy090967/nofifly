require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
PouchDB.plugin(require('pouchdb-find'))

const db = new PouchDB(process.env.COUCHDB_URL + process.env.COUCHDB_NAME)

// sort the docs by the category property
db
  .createIndex({ index: { fields: ['category'] } })
  .then(() => {
    console.log('Created an index on the category field.')
  })
  .catch(err => console.log(err))

// sort the docs by the name property
db
  .createIndex({ index: { fields: ['name'] } })
  .then(() => {
    console.log('Created an index on the name field.')
  })
  .catch(err => console.log(err))

// sort the docs by the value property
db
  .createIndex({ index: { fields: ['value'] } })
  .then(() => {
    console.log('Created an index on the value field.')
  })
  .catch(err => console.log(err))

// sort the resources by the expiration date property
db
  .createIndex({ index: { fields: ['expirationDate'] } })
  .then(() => {
    console.log('Created an index on the expiration date.')
  })
  .catch(err => console.log(err))

db
  .createIndex({ index: { fields: ['userId'] } })
  .then(() => {
    console.log('Created an index on the expiration date.')
  })
  .catch(err => console.log(err))
