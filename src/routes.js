import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import ReduxToastr from 'react-redux-toastr'

import { ProtectedRoute, NotFound } from './common/components'
import Home from './home'
import Login from './auth/login'
import Register from './auth/register'
import ChatRoutes from './chat'
import ChatMain from './chat/containers/chat-main'
import AddRoom from './chat/containers/add-room'

const appRoutes = ({ history }) => (
  <ConnectedRouter history={history}>
    <div>
      <Switch>
        <Redirect exact from="/" to="/home"/>
        <ProtectedRoute path="/home" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/chat" component={ChatRoutes}/>
        <Route path="*" component={NotFound}/>
      </Switch>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
      />
    </div>
  </ConnectedRouter>
)

export default appRoutes;
