import React from 'react'
import withRoot from '../components/withRoot'
import withDrawer from '../components/withDrawer'
import MenuAppBar from '../components/menuAppBar'
import { connect } from 'react-redux'
import addACoupon from '../media/images/add-a-coupon.jpg'
import notifly from '../media/images/notifly.jpg'
import { Link } from 'react-router-dom'

class Home extends React.Component {
  componentDidMount() {
    // this.props.toggleDrawer()
  }
  render() {
    return (
      <div>
        <MenuAppBar title="Home" />
        <br />
        <br />
        <img
          src={notifly}
          alt="loading"
          style={{
            display: 'block',
            margin: '0 auto',
            textAlign: 'center',
            width: '10%',
            maxWidth: '200px'
          }}
        />
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <img
            src={addACoupon}
            alt="loading"
            style={{
              padding: '70px',
              display: 'block',
              margin: '0 auto',
              textAlign: 'center',
              width: '30%',
              maxWidth: '400px'
            }}
          />
        </Link>
      </div>
    )
  }
}

const connector = connect(
  state => state,
  dispatch => {
    return {
      toggleDrawer: () => dispatch({ type: 'TOGGLE_DRAWER' })
    }
  }
)
export default withRoot(withDrawer(connector(Home)))
