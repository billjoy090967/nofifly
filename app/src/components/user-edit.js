import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import SaveIcon from 'material-ui-icons/Save'
import { assoc, isEmpty, map, reduce } from 'ramda'

const styles = theme => ({
  input: {
    width: '50%',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 8
  }
})

const userMenuItem = user => {
  return <MenuItem value={user._id}>{user.email}</MenuItem>
}

class EditUserForm extends React.Component {
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
        <FormControl className={classes.input} required>
          <InputLabel htmlFor="_id">User</InputLabel>
          <Select
            name="_id"
            value={this.props.editUser._id}
            onChange={e => {
              this.props.onChange('_id', e.target.value)
            }}
            input={<Input id="_id" required />}
            autoWidth
            required
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {map(categoryMenuItem, this.props.categories)}
          </Select>
        </FormControl>
        <TextField
          firstName="firstName"
          label="First Name"
          value={this.props.editUser.firstName}
          onChange={e => {
            this.props.onChange('firstName', e.target.value)
          }}
          margin="normal"
          className={classes.input}
          required
          multiline
        />
        <TextField
          lastName="lastName"
          label="Last Name"
          value={this.props.editUser.name}
          onChange={e => {
            this.props.onChange('lastName', e.target.value)
          }}
          margin="normal"
          className={classes.input}
          required
        />
        <TextField
          name="email"
          label="Email Address"
          value={this.props.editUser.email}
          onChange={e => {
            this.props.onChange('email', e.target.value)
          }}
          margin="normal"
          className={classes.input}
        />
        <TextField
          name="zipcode"
          label="Zip Code"
          value={this.props.editUser.zipcode}
          onChange={e => {
            this.props.onChange('zipcode', e.target.value)
          }}
          margin="normal"
          className={classes.input}
        />

        <Button
          fab
          color="primary"
          type="submit"
          aria-label="edit"
          className="fab-button"
          disabled={this.props.isActive}
        >
          <SaveIcon />
        </Button>
      </form>
    )
  }
}

EditUserForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditUserForm)
