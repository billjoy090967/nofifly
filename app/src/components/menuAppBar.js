import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import AccountCircleIcon from 'material-ui-icons/AccountCircle'
import { Link } from 'react-router-dom'
import notiflyLogo from '../media/images/notifly-logo.jpg'

const styles = theme => ({
  root: {
    width: '100%'
  },
  flex: {
    flex: 1
  },
  firstButton: {
    marginLeft: -12,
    marginRight: 12
  },
  lastButton: {
    marginLeft: 12,
    marginRight: -12
  },
  bannerLogo: {
    width: 'auto',
    maxHeight: '56px',
    margin: '0 auto',
    textAlign: 'center',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0'
  },
  bannerContainer: {
    width: '100%',
    margin: '0 auto'
  }
})

const MenuAppBar = props => {
  const { classes } = props

  return (
    <div id="menu-container" className={classes.root}>
      <AppBar position="fixed" color="secondary" style={{ maxHeight: '150px' }}>
        <Toolbar>
          <IconButton
            className={classes.firstButton}
            color="contrast"
            aria-label="Menu"
            onClick={props.toggleDrawer}
          >
            <MenuIcon />
          </IconButton>

          <Link to="/" className="router-link">
            <img
              alt="notifly-logo"
              src={notiflyLogo}
              className={classes.bannerLogo}
            />
          </Link>

          <Typography type="title" color="inherit" className={classes.flex}>
            {props.title}
          </Typography>

          <Link to="/login/" className="router-link">
            <IconButton color="contrast" aria-label="Account">
              <AccountCircleIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}
const mapStateToProps = state => ({})
const mapActionsToProps = (dispatch, getState) => ({
  toggleDrawer: () => dispatch({ type: 'TOGGLE_DRAWER' }),
  lastPage: (history, page) => e => {
    e.preventDefault()
    history.goBack()
    // if (page) {
    //   history.replace(page)
    // } else {
    // history.goBack()
    // }
  }
})
const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(withStyles(styles)(MenuAppBar))
