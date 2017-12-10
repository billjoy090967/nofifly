import React from 'react'
import withRoot from '../../components/withRoot'
import withDrawer from '../../components/withDrawer'
import MenuAppBar from '../../components/menuAppBar'

import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import List from 'material-ui/List'

import { connect } from 'react-redux'
import { map } from 'ramda'
import EnhancedTable from '../../components/enhanced-table'
import { Link } from 'react-router-dom'
import { setCoupons } from '../../action-creators/coupons'

class Coupons extends React.Component {
	componentDidMount() {
		this.props.onMount()
	}

	render() {
		const allCoupons = this.props.coupons
		// ramda filter to filter the coupons
		// currently logged in user should be available as this.props.currentUser or whatever.
		return (
			<div>
				<MenuAppBar title="My Coupons" account />
				<Typography />
				<List style={{ padding: 0, marginBottom: 60 }}>
					<EnhancedTable />
				</List>
				<Link to="/coupons/new">
					<Button fab color="primary" aria-label="add" className="fab-button">
						<img
							alt="AddGraphic"
							src={'../add-a-coupon'}
							width="200"
							height="auto"
						/>
					</Button>
				</Link>
			</div>
		)
	}
}

// pull in the currently logged in user from state
const mapStateToProps = state => {
	return { coupons: state.coupons }
}
const mapActionsToProps = dispatch => {
	return {
		onMount: () => {
			dispatch(setCoupons)
		}
	}
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default withRoot(withDrawer(connector(Coupons)))
