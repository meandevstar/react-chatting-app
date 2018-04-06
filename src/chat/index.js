import React from 'react'
import { Switch } from 'react-router'

import { ProtectedRoute } from '../common/components'
import ChatMain from './containers/chat-main'
import AddRoom from './containers/add-room'

const ChatRoutes = ({ match }) => 
  <Switch>
    <ProtectedRoute exact path={`${match.url}`} component={ChatMain}/>
    <ProtectedRoute path={`${match.url}/add-room`} component={AddRoom} />
  </Switch>

export default ChatRoutes