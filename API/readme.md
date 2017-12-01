# Notifly API

[Docs](../readme.md)

This RESTful HTTP API manages the coupons and gift cards in your wallet. Have you ever left a grocery store and realized "Hey, I forgot to use my coupons?" Well, this site was built with you in mind in order to avoid this constant frustration.  Be it our busy schedules, simple forgetfulness or early onset Alzheimers, my guess is that this happens to a lot of us.  Hence the birth of Coupy, my pet fly.  Coupy buzzes my smartphone everytime I step foot into a store in which I have a coupon. Ingenious, right?  Here is a little bit of information about coupons.  (1) They come in every size, shape, and form. (2) There are still many stores that only accept paper coupons...yes...even to this day. (3) That is why we created a simple form you can easily fill out for each of your coupons so that you can be reminded you have them in your wallet or purse! (4) Yes, we all agree with technology, it would be so much easier just to scan the coupons into our phones.  Once all stores begin accepting digital coupons, then Notifly 2.0 will be ready to go!


## Getting Started

Instructions on how to get a developer up and running on the Notifly
API in a local, development environment.

> The instructions assume node >= 7x and you have access to a CouchDB
> installation on either your local machine or in the cloud as a DBaas, such as
> Cloudant.

```
$ git clone https://github.com/billjoy090967/notifly.git
$ cd notifly
```

## Create a database in CouchDB

Using either a local installation of CouchDB or a DBaaS such as Cloudant, create
a new database. If your using a DBaaS, create an API key and/or ensure the key
as admin rights to the database. Admin rights are needed for creating indexes
within the database.

Using the principle of least privilege, you may wish to create a second API key
for your API. This key may only provide read, write access to the database.

> Tip: After creating your API Key or keys, you will need to write both the key
> and password down and keep it secure and safe. In the following step, you will
> use the key and password to create a `COUCHDB_URL` as an environment variable.

## API Environment Variables

### **.env**

* At the root of **api** folder, copy the **.env-sample** file as **.env** file.
  Modify the following environment variables. If you're using a DBaaS, use the
  key, password, and CouchDB base url to derive the value of `COUCHDB_URL`. If
  you aren't using a DBaaS and are running couchDB locally, just use the CouchDB
  base url. See example below. Use your newly created database name as the value
  of `COUCHDB_NAME`. Provide a `PORT` number, such as 4000, that does not
  conflict with other port numbers in your project.:

  * `COUCHDB_URL`
  * `COUCHDB_NAME`
  * `PORT`

For example, here are example values for `COUCHDB_URL` and `COUCHDB_NAME`
environment variables for an instance of CouchDB DBaaS running in IBM Blue Mix's
Cloudant service:

> Warning: Keep your API password/secret safe! Be sure your **.env** file is
> referenced within your **.gitignore**. Do not expose the secret in GitHub or
> anywhere else. If your secret is compromised, you will need to regenerate a
> new API key and secret and update your application.

```
COUCHDB_URL=https://<API KEY>:<API PASSWORD>@<BASE URL TO CLOUDANT.com>/
COUCHDB_NAME=veteran
```

**Complete DBaaS URL Example**

```
const db = new PouchDB(process.env.COUCHDB_URL + process.env.COUCHDB_NAME)

// would produce something such as:
// const db = new PouchDB(https://arencharlynaturousfeli7:287bb97bafee05f3d2fb7840371182d3d2534red@90629927-b1a9-4251-9b99-f76bd577tedx8-bluemix.cloudant.com/veteran)
```

### Installing Dependencies and starting our API

After you have successfully provided the values for your environment variables,
install dependencies, load data, load indexes, and start the api. See `scripts`
within the **package.json** for details:

**YARN EXAMPLE**

```
$ yarn
$ yarn load
$ yarn loadIndex
$ yarn start
```

**NPM EXAMPLE**

```
$ npm install
$ npm run load
$ npm run loadIndex
$ npm start
```

Check your terminal and verify the API starts. Attempt the following HTTP
requests using a client such as your browser or POSTman.

```
GET http://localhost:5000/resources
```

## Basics

### Scheme

Once deployed, this API will communicate over HTTPS. Locally on your development
environment, you can run this API under HTTP.

### Authorization

No authorization at this time. Authorization will be included in future
releases.

### Request Headers

The following request headers are required when calling the API:

* `Content-Type` - The `Content-Type` request header should include a value of
  `application/json` and is required when providing content within the body of a
  request.

### Date Format

Date are formatted to the ISO 8601 standard.

### HTTP Verbs

| VERB   | Description                                                                                                                                                                                      |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| GET    | Use to retrieve the user information (account holder) and their coupons via `\users`, `\coupons` and a single coupon via `\coupons\{id}`. |
| POST   | Used to create a user (account holder) and coupon via `\users` and `\coupons`.                                                                                               |
| PUT    | Used to update a user (account holder) and coupons via `\users\{id}` and `\coupons\{id}`, respectively.                                                                         |
| DELETE | Used to delete `\coupons\{id}`                                                                                                                                    |

### Content Types

All endpoints accept and return data formatted as JSON. See Request Headers.

### Status Code

* [200 - OK](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_Success)
* 201 - Created
* 400 - Bad Request
* 404 - Not Found
* 500 - Internal Server Error
* 429 - Too Many Request

### Filtering

TODO: talk about the endpoints that have a filter query string and provide a
couple of examples.

## Coupons

## POST /coupons

Adds a coupon to the collection of coupons for that specific user. When adding a coupon the
`category`, `name`, and `expirationDate` are required fields.

** Sample Request **

```
POST /categories

{
category: "Restaurant",
  name: "Pizza Hut",
  expirationDate: "2018-05-31"
}
```

** Sample 201 Response **

```
{
  "ok": true,
  "id": "coupon_billjoy090967@gmail.com_pizza-hut_2018-05-31",
  "rev": "1-A6157A5EA545C99B00FF904EEF05FD9F"
}
```

## GET /coupons/{id}

Gets a coupon from the collection of coupons.

** Sample Request **

```
GET /coupons/coupon_billjoy090967@gmail.com_pizza-hut_2018-05-31
```

** Sample 200 Response **

```
{
  _id: "coupon_billjoy090967@gmail.com_pizza-hut_2018-05-31",
  _rev: "1-A6157A5EA545C99B00FF904EEF05FD9F",
  type: "coupon",
  category: "Restaurant"
  name: "Pizza Hut",
  description: "buy one large pizza and get a second for free",
  deal: "BOGO",
  expirationDate: "2018-05-31"
}
```

## PUT /coupons/{id}

Edits the coupon object. Edits a coupon from the
collection of coupons. When editing a coupon the `_id` and `_rev` are required fields

** Sample Request **

```
PUT /coupons/coupon_billjoy090967@gmail.com_pizza-hut_2018-05-31

{
  _id: "coupon_billjoy090967@gmail.com_pizza-hut_2018-05-31",
  _rev: "1-A6157A5EA545C99B00FF904EEF05FD9F"
}
```

** Sample 202 Response **

```
{
  ok: true,
  _id: "coupon_billjoy090967@gmail.com_pizza-hut_2018-05-31",
  _rev: "2-A6157A5EA545C99B00FF904EEF05FF32"
}
```

## DELETE /coupons/{id}

** Sample Request **

```
DELETE /coupons/coupon_billjoy090967@gmail.com_pizza-hut_2018-05-31
```

** Sample 200 Response **

```
{
  "ok":true,
  _id: "coupon_billjoy090967@gmail.com_pizza-hut_2018-05-31",
  "rev":"3-A6157A5EA545C99B00FF904EEF05FF32"
}
```

## GET /coupons

Retrieves a list of user's coupons.

** Sample Request **

```
GET /coupons
```

** Sample 200 Response **

```
[
{
  _id: 'coupon_billjoy090967@gmail.com_pizza-hut_2018-05-31',
  userId: 'user_billjoy090967@gmail.com',
  type: 'coupon',
  category: 'Restaurant',
  name: 'Pizza Hut',
  description: 'buy one large pizza and get a second for free',
  deal: 'BOGO',
  expirationDate: '2018-05-31'
},
{
  _id: 'coupon_billjoy090967@gmail.com_jiffy_lube_2017-12-31',
  userId: 'user_billjoy090967@gmail.com',
  type: 'coupon',
  category: 'Auto Repair',
  name: 'Jiffy Lube',
  description: 'standard oil change for $19.99',
  deal: '$19.99',
  expirationDate: '2017-12-31'
}, ...

]
```

## Users

## POST /users

Adds a user to the collection of users. When adding a user the
`firstName`, `lastName`, `email`, and `zipcode` are required fields.

** Sample Request **

```
POST /users

{
  _id: 'user_billjoy090967@gmail.com',
  type: 'user',
  email: 'billjoy090967@gmail.com'
  firstName: 'Bill',
  lastName: 'Joy',
  zipcode: '29429'
}
```

** Sample 201 Response **

```
{
ok: "true",
_id: "user_billjoy090967@gmail.com",
_rev: "1-A6157A5EA545C99B00FF904EEF094035U"
}
```

## GET /users/{id}

Retrieves a specific resources.

** Sample Request **

```
GET /users/user_billjoy090967@gmail.com
```

** Sample 200 Response **

```
{
  _id: 'user_billjoy090967@gmail.com',
  type: 'user',
  email: 'billjoy090967@gmail.com'
  firstName: 'Bill',
  lastName: 'Joy',
  zipcode: '29429'
}
```

## UPDATE /users/{id}

Updates an existing specific user.

** Sample Request **

```
PUT /users/user_billjoy090967@gmail.com

{
  _id: 'user_billjoy090967@gmail.com',
  type: 'user',
  email: 'billjoy090967@gmail.com'
  firstName: 'Bill',
  lastName: 'Joy',
  zipcode: '29429'
}
```

** Sample 200 Response **

```
{
ok: "true",
_id: "user_billjoy090967@gmail.com",
_rev: "2-A6157A5EA545C99B00FF904EEF094035U"
}
```

[Docs](../readme.md)
