import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import Visibility from 'material-ui-icons/Visibility'
import VisibilityOff from 'material-ui-icons/VisibilityOff'
import SendIcon from 'material-ui-icons/Send'
import history from '../history'

const styles = theme => ({
  root: {},
  formControl: {
    margin: theme.spacing.unit
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  }
})

class UserLogin extends React.Component {
  state = {
    email: '',
    password: '',
    showPassword: false
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  handleMouseDownPassword = event => {
    event.preventDefault()
  }

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <FormControl
          fullWidth
          className={classes.formControl}
          style={{ maxWidth: '300px' }}
        >
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            value={this.state.email}
            onChange={this.handleChange('email')}
            startAdornment={<InputAdornment position="start" />}
          />
        </FormControl>
        <br />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={this.handleClickShowPasssword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <button
          type="submit"
          style={{
            border: 0,
            background: 'none',
            position: 'fixed',
            left: '5px'
          }}
          className="fab-button"
          onClick={e => history.push('/coupons')}
          // disabled={this.props.isActive}
        >
          <SendIcon />
        </button>
      </div>
    )
  }
}

UserLogin.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UserLogin)
