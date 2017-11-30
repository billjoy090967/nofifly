import React, { Component } from 'react'
import './App.css'
import auth from './auth'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'

import Home from './pages/home'
import Login from './pages/login'
import Callback from './pages/callback'
import Protected from './pages/protected'


const { login, handleAuthentication, isAuthenticated, logout } = auth()

const App = () => {
return (



)


}
