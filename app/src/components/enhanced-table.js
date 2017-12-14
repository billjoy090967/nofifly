import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import keycode from 'keycode'
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from 'material-ui/Table'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Tooltip from 'material-ui/Tooltip'
import history from '../history'
import { connect } from 'react-redux'
import { pathOr } from 'ramda'
import { COUPONS_BY_EMAIL } from '../constants'

const columnData = [
  { id: 'category', numeric: true, disablePadding: false, label: 'Category' },
  { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
  { id: 'deal', numeric: true, disablePadding: false, label: 'Deal' },
  {
    id: 'expirationDate',
    numeric: true,
    disablePadding: false,
    label: 'Expiration Date'
  }
]

class EnhancedTableHead extends React.Component {
  static propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
  }

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const { order, orderBy } = this.props
    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          }, this)}
        </TableRow>
      </TableHead>
    )
  }
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: 2
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.A700,
          backgroundColor: theme.palette.secondary.A100
        }
      : {
          color: theme.palette.secondary.A100,
          backgroundColor: theme.palette.secondary.A700
        },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto'
  }
})

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography type="subheading">{numSelected} selected</Typography>
        ) : (
          <Typography type="title">
            <h6>Your Customized List</h6>
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
}

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar)

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    maxWidth: 800
  },
  tableWrapper: {
    overflowX: 'auto'
  }
})

class EnhancedTable extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      order: 'asc',
      orderBy: 'name',
      selected: [],
      data: [].sort((a, b) => (a.name < b.name ? -1 : 1)),
      page: 0,
      rowsPerPage: 5
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    const data =
      order === 'desc'
        ? this.props.couponsByEmailData.sort(
            (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
          )
        : this.props.couponsByEmailData.sort(
            (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1)
          )

    this.setState({ order, orderBy })
    this.props.dispatch({ type: COUPONS_BY_EMAIL, payload: data })
  }

  handleKeyDown = (event, id) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, id)
    }
  }

  handleClick = (event, id) => {
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    this.setState({ selected: newSelected })
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1

  render() {
    const { classes } = this.props
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody style={{ paddingLeft: '20px' }}>
              {pathOr([], ['couponsByEmailData'], this.props)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow
                      hover
                      onClick={e => history.push('/coupons/' + n._id + '/edit')}
                      tabIndex={-1}
                      key={n.id}
                    >
                      <TableCell numeric>{n.category}</TableCell>
                      <TableCell numeric>{n.name}</TableCell>
                      <TableCell numeric>{n.deal}</TableCell>
                      <TableCell numeric>{n.expirationDate}</TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 0 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    )
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return { state: state }
}

const mapActionsToProps = dispatch => {
  return {
    dispatch
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(withStyles(styles)(EnhancedTable))
