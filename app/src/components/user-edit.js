import React from 'react'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import SaveIcon from 'material-ui-icons/Save'

const styles = theme => ({
  input: {
    width: '50%',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 8
  }
})

class EditUserForm extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <form style={{ marginTop: 8 }} onSubmit={this.props.editUser}>
        <TextField
          label="First Name"
          value={this.props.editUser.firstName}
          onChange={e => {
            this.props.onChange('firstName', e.target.value)
          }}
          margin="normal"
          required
          className={classes.input}
        />
        <TextField
          label="Last Name"
          value={this.props.editUser.lastName}
          onChange={e => {
            this.props.onChange('lastName', e.target.value)
          }}
          margin="normal"
          required
          className={classes.input}
          multiline
        />
        <TextField
          label="E-mail Address"
          value={this.props.editUser.email}
          onChange={e => {
            this.props.onChange('email', e.target.value)
          }}
          margin="normal"
          required
          className={classes.input}
          multiline
        />
        <TextField
          label="Zip Code"
          value={this.props.editUser.zipcode}
          onChange={e => {
            this.props.onChange('zipcode', e.target.value)
          }}
          margin="normal"
          required
          className={classes.input}
        />
        <br />
        <br />
        <Button
          fab
          disabled={this.props.isActive}
          className="fab-button"
          color="secondary"
          aria-label="save"
          type="submit"
        >
          <SaveIcon />
        </Button>
      </form>
    )
  }
}

export default withStyles(styles)(EditUserForm)
