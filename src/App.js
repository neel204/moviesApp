import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './Components/Home'
import NotFound from './Components/NotFound'
import LoginFrom from './Components/Login'
import Account from './Components/Account'
import Search from './Components/Search'
import Popular from './Components/Popular'
import MoviesDetails from './Components/MoviesDetails'

import ProtectedRoute from './Components/ProtectedRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginFrom} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/search" component={Search} />
    <ProtectedRoute exact path="/account" component={Account} />
    <ProtectedRoute exact path="/movies/:id" component={MoviesDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
