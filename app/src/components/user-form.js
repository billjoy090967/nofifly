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
import { map } from 'ramda'

const styles = theme => ({
  input: {
    width: '50%',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 8
  }
})

const couponMenuItem = coupon => {
  return <MenuItem value={coupon.name}>{coupon.name}</MenuItem>
}

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
        <FormControl className={classes.input} required>
          <InputLabel htmlFor="couponId">Coupon</InputLabel>
          <Select
            name="couponId"
            value={this.props.newUser.couponId}
            onChange={e => {
              this.props.onChange('couponId', e.target.value)
            }}
            input={<Input id="couponId" required />}
            autoWidth
            required
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {map(couponMenuItem, this.props.coupons)}
          </Select>
        </FormControl>
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
          label="E-Mail Address"
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

        <Button
          fab
          color="primary"
          type="submit"
          aria-label="add"
          className="fab-button"
          disabled={this.props.isActive}
        >
          <SaveIcon />
        </Button>
      </form>
    )
  }
}

UserForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UserForm)
