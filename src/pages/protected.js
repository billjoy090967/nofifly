import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

cost Protected = props => {
  return (
<div>
<h1>Protected</h1>
{props.data) || 'No Data'}
<button onClick={props.logout}>Logout</button>
</div>

  )
}

const mapStateToProps = (state) => state
const mapActionsToProps = dispatch => {
  return {
getData: () => dispatch(getData)

  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(Protected)
