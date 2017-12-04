import React from 'react'
import { Switch, Router, Route } from 'react-router-dom'
import Home from './pages/home'
import Users from './pages/users'
import EditUser from './pages/users/edit'
import NewUser from './pages/users/new'
import About from './pages/about'
import Legal from './pages/legal'
import Coupons from './pages//coupons/index'
import NewCoupon from './pages/coupons/new'
import EditCoupon from './pages/coupons/edit'

import history from './history'
import ScrollToTop from './ScrollToTop'
const App = props => {
  return (
    <Router history={history}>
      <ScrollToTop>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users/new" component={NewUser} />
            <Route exact path="/users/:id/edit" component={EditUser} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/coupons/new" component={NewCoupon} />
            <Route path="/coupons/:id/edit" component={EditCoupon} />
            <Route exact path="/coupons" component={Coupons} />
            <Route path="/about" component={About} />
            <Route path="/legal" component={Legal} />
          </Switch>
        </div>
      </ScrollToTop>
    </Router>
  )
}

export default App
