import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import SendIcon from 'material-ui-icons/Send'

const styles = theme => ({
  input: {
    width: '50%',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 8
  }
})

class UserForm extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <form
        style={{ marginTop: 8 }}
        autoComplete="off"
        onSubmit={e => {
          e.preventDefault()
          this.props.onSubmit()
        }}
      >
        <TextField
          name="firstName"
          label="First Name"
          value={this.props.newUser.firstName}
          onChange={e => {
            this.props.onChange('firstName', e.target.value)
          }}
          margin="normal"
          className={classes.input}
          required
          multiline
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={this.props.newUser.lastName}
          onChange={e => {
            this.props.onChange('lastName', e.target.value)
          }}
          margin="normal"
          className={classes.input}
          required
        />
        <TextField
          name="email"
          label="E-mail Address"
          value={this.props.newUser.email}
          onChange={e => {
            this.props.onChange('email', e.target.value)
          }}
          margin="normal"
          className={classes.input}
          required
          multiline
        />
        <TextField
          name="zipcode"
          label="Zip Code"
          value={this.props.newUser.zipcode}
          onChange={e => {
            this.props.onChange('zipcode', e.target.value)
          }}
          margin="normal"
          className={classes.input}
          required
          multiline
        />
        <TextField
          name="password"
          label="Password"
          value={this.props.newUser.password}
          onChange={e => {
            this.props.onChange('password', e.target.value)
          }}
          margin="normal"
          className={classes.input}
        />
        <button
          type="submit"
          style={{ border: 0, background: 'none' }}
          className="fab-button"
          // disabled={this.props.isActive}
        >
          <SendIcon />
        </button>
      </form>
    )
  }
}
UserForm.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(UserForm)
