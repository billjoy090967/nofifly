import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import SaveIcon from 'material-ui-icons/Save'
import history from '../history'

const styles = theme => ({
  input: {
    width: '50%',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 8
  }
})

class EditCouponForm extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <form
        style={{ marginTop: 8 }}
        onSubmit={e => {
          e.preventDefault()
          this.props.onSubmit()
        }}
      >
        <TextField
          name="category"
          label="Category"
          value={this.props.editCoupon.category}
          onChange={e => {
            this.props.onChange('category', e.target.value)
          }}
          margin="normal"
          className={classes.input}
          required
        />
        <TextField
          name="name"
          label="Store Name"
          value={this.props.editCoupon.name}
          onChange={e => {
            this.props.onChange('name', e.target.value)
          }}
          margin="normal"
          className={classes.input}
          required
        />
        <TextField
          name="deal"
          label="Deal"
          value={this.props.editCoupon.deal}
          onChange={e => {
            this.props.onChange('deal', e.target.value)
          }}
          margin="normal"
          className={classes.input}
          required
          multiline
        />
        <TextField
          name="expirationDate"
          label="Expiration Date"
          value={this.props.editCoupon.expirationDate}
          onChange={e => {
            this.props.onChange('expirationDate', e.target.value)
          }}
          margin="normal"
          className={classes.input}
          required
        />
        <TextField
          name="description"
          label="Description"
          value={this.props.editCoupon.description}
          onChange={e => {
            this.props.onChange('description', e.target.value)
          }}
          margin="normal"
          className={classes.input}
          required
          multiline
        />
        <br />
        <br />
        <Button
          fab
          color="secondary"
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
EditCouponForm.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(EditCouponForm)
