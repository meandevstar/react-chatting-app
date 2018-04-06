import React from 'react'
import { Switch, Route } from 'react-router'

import { ProtectedRoute } from '../common/components'
import ChatMainContainer from './containers/chat-main'
import WorkspaceContainer from './containers/workspace-main'
import AddRoomContainer from './containers/add-room'

const ChatRoutes = ({ match }) => 
  <Switch>
    <ProtectedRoute exact path={`${match.url}`} component={ChatMainContainer}/>
    <ProtectedRoute path={`${match.url}/add-room`} component={AddRoomContainer} />
    <Route exact path={`${match.url}/workspace`} component={WorkspaceContainer}/>
  </Switch>

export default ChatRoutes