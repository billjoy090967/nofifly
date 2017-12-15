import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { ListItem, FormControl, InputLabel, Select } from 'material-ui'
import TextField from 'material-ui/TextField'
import addACoupon from '../media/images/add-a-coupon.jpg'

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
        autoComplete="off"
        onSubmit={e => {
          e.preventDefault()
          this.props.onSubmit()
        }}
      >
        <ListItem>
          <FormControl>
            <InputLabel>Category</InputLabel>
            <Select
              native
              value={this.props.coupon.category}
              onChange={e => {
                this.props.onChange('category', e.target.value)
              }}
            >
              <option value="" />
              <option value="Entertainment">Entertainment</option>
              <option value="Grocery">Grocery</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Service">Service</option>
              <option value="Store">Store</option>
            </Select>
          </FormControl>
        </ListItem>

        <TextField
          name="name"
          label="Store Name"
          value={this.props.coupon.name}
          onChange={e => {
            this.props.onChange('name', e.target.value)
          }}
          margin="normal"
          className={classes.input}
          required
          multiline
        />
        <TextField
          name="description"
          label="Description"
          value={this.props.coupon.description}
          onChange={e => {
            this.props.onChange('description', e.target.value)
          }}
          margin="normal"
          className={classes.input}
          multiline
        />
        <TextField
          name="deal"
          label="Deal"
          value={this.props.coupon.deal}
          onChange={e => {
            this.props.onChange('deal', e.target.value)
          }}
          margin="normal"
          className={classes.input}
          required
        />
        <TextField
          name="expirationDate"
          label="Expiration Date"
          type="date"
          defaultValue="2017-12-15"
          onChange={e => {
            this.props.onChange('expirationDate', e.target.value)
          }}
          margin="normal"
          className={classes.input}
          required
        />
        <br />
        <br />

        <button
          type="submit"
          style={{
            border: 0,
            background: 'none',
            position: 'fixed',
            left: '10px'
          }}
          className="fab-button"
          // disabled={this.props.isActive}
        >
          <img
            alt="loading"
            src={addACoupon}
            style={{ width: 'auto', height: '70px' }}
          />
        </button>
      </form>
    )
  }
}
CouponForm.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(CouponForm)
