require('dotenv').config()

const PouchDB = require('pouchdb')
const db = new PouchDB(process.env.COUCHDB_URL + process.env.COUCHDB_NAME)

db
  .bulkDocs([
    {
      "_id": "billjoy090967@gmail.com",
      "_rev": "1-492ceea5ae2b6cad649b8b8f8009731f",
      "first-name": "Bill",
      "last-name": "Joy",
      "password": "",
      "zipcode": "29429",
      "coupons": [
        {
          "category": "Restaurant",
          "name": "Pizza Hut",
          "description": "buy one large pizza and get a second for free",
          "value": "BOGO",
          "expiration-date": "2018-05-31"
        },
        {
          "category": "Auto Repair",
          "name": "Jiffy Lube",
          "description": "standard oil change for $19.99",
          "value": "$19.99",
          "expiration-date": "2017-12-31"
        },
        {
          "category": "Entertainment",
          "name": "Wild Blue Ropes",
          "description": "two hours of ropes for $20",
          "value": "$20.00",
          "expiration-date": "2018-07-31"
        }
      ],
      {
        "_id": "tiffanyjoy160@gmail.com",
        "_rev": "1-73947ff72917a866a9babbacf84ac066",
        "first-name": "Tiffany",
        "last-name": "Joy",
        "password": "",
        "zipcode": "29429",
        "coupons": [
          {
            "category": "Restaurant",
            "name": "Perkins",
            "description": "$1 slice of pie",
            "value": "$1.00",
            "expiration-date": "2018-12-01"
          },
          {
            "category": "Store",
            "name": "Kohl's",
            "description": "$25 in Kohl's Cash",
            "value": "$25.00",
            "expiration-date": "2018-12-01"
          }
        ]
      }
    }
])
  .then(function(result) {
    console.log('attempting to load data. Inspect each result item below: ')
    console.log(JSON.stringify(result, null, 2))
  })
  .catch(function(err) {
    console.log(err)
  })
