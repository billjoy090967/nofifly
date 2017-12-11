import React from 'react'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import SaveIcon from 'material-ui-icons/Save'
import { Link } from 'react-router-dom'

const styles = theme => ({
  input: {
    width: '50%',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 8
  }
})

class CouponForm extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <form
        style={{ marginTop: 8 }}
        onSubmit={this.props.updateCoupon(this.props.editCoupon)}
      >
        <TextField
          label="Category"
          value={this.props.editCoupon.category}
          onChange={e => {
            this.props.onChange('category', e.target.value)
          }}
          margin="normal"
          required
          className={classes.input}
        />
        <TextField
          label="Name"
          value={this.props.editCoupon.name}
          onChange={e => {
            this.props.onChange('name', e.target.value)
          }}
          margin="normal"
          required
          className={classes.input}
          multiline
        />
        <TextField
          label="Deal"
          value={this.props.editCoupon.deal}
          onChange={e => {
            this.props.onChange('deal', e.target.value)
          }}
          margin="normal"
          required
          className={classes.input}
          multiline
        />
        <TextField
          label="Expiration Date"
          value={this.props.editCoupon.expirationDate}
          onChange={e => {
            this.props.onChange('expirationDate', e.target.value)
          }}
          margin="normal"
          required
          className={classes.input}
        />
        <TextField
          label="Description"
          value={this.props.editCoupon.description}
          onChange={e => {
            this.props.onChange('description', e.target.value)
          }}
          margin="normal"
          required
          className={classes.input}
        />
        <Link to="/coupons">
          <br />
          <br />
          <Button
            fab
            disabled={this.props.isActive}
            className="fab-button"
            color="secondary"
            aria-label="add"
            type="submit"
          >
            <SaveIcon />
          </Button>
        </Link>
      </form>
    )
  }
}

export default withStyles(styles)(CouponForm)
