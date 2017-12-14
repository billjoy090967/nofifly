import React from 'react'
import Button from 'material-ui/Button'
import withRoot from '../components/withRoot'
import withDrawer from '../components/withDrawer'
import MenuAppBar from '../components/menuAppBar'
import PaperSheet from '../components/paperSheet'
import { connect } from 'react-redux'
import notifly from '../media/images/notifly.jpg'
import Home from 'material-ui-icons/Home'
import Legal from 'material-ui-icons/Gavel'
import { CardMedia } from 'material-ui/Card'
import { Link } from 'react-router-dom'

const aboutText = [
  {
    text: (
      <CardMedia
        style={{
          maxHeight: '128px',
          maxWidth: '357px',
          margin: '0 auto',
          display: 'block'
        }}
      />
    ),
    style: 'paragraph',
    bottomMargin: true
  },
  {
    text:
      'Have you ever left a grocery store and realized "Hey, I forgot to use my coupons?" Well, this site was built with you in mind in order to avoid this constant frustration.  Be it our busy schedules, simple forgetfulness or early onset Alzheimers, my guess is that this happens to a lot of us.  Hence the birth of Coupy, my pet fly.  Coupy buzzes my smartphone everytime I step foot into a store in which I have a coupon. Ingenious, right?  Here is a little bit of information about coupons.  (1) They come in every size, shape, and form. (2) There are still many stores that only accept paper coupons...yes...even to this day. (3) That is why we created a simple form you can easily fill out for each of your coupons so that you can be reminded you have them in your wallet or purse! (4) Yes, we all agree with technology, it would be so much easier just to scan the coupons into our phones.  Once all stores begin accepting digital coupons, then Notifly 2.0 will be ready to go!',
    style: 'paragraph',
    bottomMargin: true
  },

  {
    text: (
      <img
        alt="Coupy"
        src={notifly}
        width="100"
        height="auto"
        class="animated zoomInRight"
      />
    ),
    style: 'italic',
    bottomMargin: false
  }
]

const About = props => {
  return (
    <div>
      <MenuAppBar title="About" />
      <div className="container">
        <PaperSheet data={aboutText} />

        <Link to="/legal" style={{ textDecoration: 'none' }}>
          <Button
            raised
            color="primary"
            style={{ marginTop: 16, marginLeft: 16 }}
          >
            <Legal style={{ marginRight: 7, height: 16, width: 16 }} />
            Legal
          </Button>
        </Link>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button
            raised
            color="primary"
            style={{ marginTop: 16, marginLeft: 16 }}
          >
            <Home style={{ marginRight: 7, height: 16, width: 16 }} />
            Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

const connector = connect(
  state => state,
  dispatch => {
    return {
      toggleDrawer: () => dispatch({ type: 'TOGGLE_DRAWER' })
    }
  }
)

export default withRoot(withDrawer(connector(About)))
