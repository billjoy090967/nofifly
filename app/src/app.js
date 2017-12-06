import React from 'react'
import { Switch, Router, Route } from 'react-router-dom'
import Home from './pages/home'
import About from './pages/about'
import Legal from './pages/legal'
import Login from './pages/login'
import Coupons from './pages/coupons/'
import NewCoupon from './pages/coupons/new'
import EditCoupon from './pages/coupons/edit'
import Users from './pages/users'
import EditUser from './pages/users/edit'
import NewUser from './pages/users/new'

import history from './history'
import ScrollToTop from './ScrollToTop'
const App = props => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/legal" component={Legal} />
        <Route path="/login" component={Login} />
        <Route exact path="/coupons" component={Coupons} />
        <Route exact path="/coupons/new" component={NewCoupon} />
        <Route path="/coupons/:id/edit" component={EditCoupon} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/:id/edit" component={EditUser} />
        <Route exact path="/users/new" component={NewUser} />
      </Switch>
    </Router>
  )
}

export default App
