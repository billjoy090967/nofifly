require('dotenv').config()

const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
const db = new PouchDB(process.env.COUCHDB_URL + process.env.COUCHDB_NAME)

db.bulkDocs([
  {
    _id: 'user_billjoy090967@gmail.com',
    type: 'user',
    email: 'billjoy090967@gmail.com',
    firstName: 'Bill',
    lastName: 'Joy',
    zipcode: '29429'
  },
  {
    _id: 'user_tiffanyjoy160@gmail.com',
    type: 'user',
    email: 'tiffanyjoy160@gmail.com',
    firstName: 'Tiffany',
    lastName: 'Joy',
    zipcode: '29429'
  },
  {
    _id: 'user_rbickel1945@att.net',
    type: 'user',
    email: 'rbickel1945@att.net',
    firstName: 'Ruth',
    lastName: 'Bickel',
    zipcode: '54313'
  },
  {
    _id: 'user_mnijoy@gmail.com',
    type: 'user',
    email: 'mnijoy@gmail.com',
    firstName: 'Irene',
    lastName: 'Joy',
    zipcode: '20855'
  },
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
    category: 'Service',
    name: 'Jiffy Lube',
    description: 'standard oil change for $19.99',
    deal: '$19.99',
    expirationDate: '2017-12-31'
  },
  {
    _id: 'coupon_billjoy090967@gmail.com_wild_blue_ropes_2018-07-31',
    userId: 'user_billjoy090967@gmail.com',
    type: 'coupon',
    category: 'Entertainment',
    name: 'Wild Blue Ropes',
    description: 'two hours of ropes for $20',
    deal: '$20.00',
    expirationDate: '2018-07-31'
  },
  {
    _id: 'coupon_tiffanyjoy160@gmail.com_perkins_2018-12-01',
    userId: 'user_tiffanyjoy160@gmail.com',
    type: 'coupon',
    category: 'Restaurant',
    name: 'Perkins',
    description: '$1 slice of pie',
    deal: '$1.00',
    expirationDate: '2018-12-01'
  },
  {
    _id: 'coupon_tiffanyjoy160@gmail.com_kohls_2018-11-01',
    userId: 'user_tiffanyjoy160@gmail.com',
    type: 'coupon',
    category: 'Store',
    name: "Kohl's",
    description: "$25 in Kohl's Cash",
    deal: '$25.00',
    expirationDate: '2018-11-01'
  },
  {
    _id: 'coupon_billjoy090967@gmail.com_harris_teeter_2018-04-15',
    userId: 'user_billjoy090967@gmail.com',
    type: 'coupon',
    category: 'Grocery',
    name: 'Harris Teeter',
    description: '$2.50 of any 1 pound of deli meat',
    deal: '$2.50',
    expirationDate: '2018-04-15'
  },
  {
    _id: 'coupon_billjoy090967@gmail.com_publix_2017_12_25',
    userId: 'user_billjoy090967@gmail.com',
    type: 'coupon',
    category: 'Grocery',
    name: 'Publix ',
    description: "$.50 of any Campbell's Chunky Soup",
    deal: '$1.50',
    expirationDate: '2018-12-25'
  },
  {
    _id: 'coupon_billjoy090967@gmail.com_bonefish_grill_2020_12_31',
    userId: 'user_billjoy090967@gmail.com',
    type: 'coupon',
    category: 'Restaurant',
    name: 'Bonefish Grill',
    description: '$50.00',
    deal: '$50.00',
    expirationDate: '2020-12-31'
  },
  {
    _id: 'coupon_tiffanyjoy160@gmail.com_harris-teeter_2017-12-15',
    userId: 'user_tiffanyjoy160@gmail.com',
    type: 'coupon',
    category: 'Grocery',
    name: 'Harris Teeter',
    deal: '$0.50',
    expirationDate: '2017-12-16',
    description: '$0.50 off Minute Maid Orange Juice'
  },
  {
    _id: 'coupon_tiffanyjoy160@gmail.com_new-york-and-company_2019-12-15',
    userId: 'user_tiffanyjoy160@gmail.com',
    type: 'coupon',
    category: 'Store',
    name: 'New York & Company',
    deal: '$100.00',
    expirationDate: '2019-12-15',
    description: '$100 Gift Certificate'
  },
  {
    _id: 'coupon_tiffanyjoy160@gmail.com_bed_bath_and_beyond_2018-04-15',
    userId: 'user_tiffanyjoy160@gmail.com',
    type: 'coupon',
    category: 'Store',
    name: 'Bed, Bath, & Beyond',
    deal: '20% Off',
    expirationDate: '2018-04-15',
    description: '20% off one item'
  },
  {
    _id: 'coupon_rbickel1945@att.net_marcus-theatres_2018-02-28',
    userId: 'user_rbickel1945@att.net',
    type: 'coupon',
    category: 'Entertainment',
    name: 'Marcus Theatres',
    deal: 'Free Movie',
    expirationDate: '2018-02-28',
    description: 'Free adult pass for one movie'
  },
  {
    _id: 'coupon_rbickel1945@att.net_hu-hot-mongolian-grill_2018-06-30',
    userId: 'user_rbickel1945@att.net',
    type: 'coupon',
    category: 'Restaurant',
    name: 'HuHot Mongolian Grill',
    deal: 'Free Appetizer',
    expirationDate: '2018-06-30',
    description: 'Free appetizer with a purchase of an entree'
  },
  {
    _id: 'coupon_rbickel1945@att.net_festival-foods_2018-03-31',
    userId: 'user_rbickel1945@att.net',
    type: 'coupon',
    category: 'Grocery',
    name: 'Festival Foods',
    deal: '$10.00 Off',
    expirationDate: '2018-03-31',
    description: '$10.00 off 10 Festy Burgers'
  }
])
