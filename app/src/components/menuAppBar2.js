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
import Grid from 'material-ui/Grid'

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
    maxHeight: '56px'
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
          <Grid container spacing={24}>
            <Grid item xs={2}>
              <IconButton
                className={classes.firstButton}
                color="contrast"
                aria-label="Menu"
                onClick={props.toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={24}>
                <Grid item xs={2} sm={3} md={4} lg={4} xl={4} />
                <Grid item xs={7}>
                  <Link to="/">
                    <img
                      alt="notifly-logo"
                      src={notiflyLogo}
                      className={classes.bannerLogo}
                    />
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Typography type="title" color="inherit" className={classes.flex}>
                {props.title}
              </Typography>

              <Link to="/login/">
                <IconButton color="contrast" aria-label="Account">
                  <AccountCircleIcon />
                </IconButton>
              </Link>
            </Grid>
          </Grid>
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
