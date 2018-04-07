import React from 'react'
import { connect } from 'react-redux'

import { AppHeader } from '../../common/components'
import { SideBar, ChatHeader, ChatHistory, ChatFooter } from './index'

const ChatContainer = () =>
  <div>
    <AppHeader />
    <div className="container clearfix">
      <SideBar />
      <div className="chat">
        <ChatHeader />
        <ChatHistory />
        <ChatFooter />
      </div>
    </div>
  </div>


export default ChatContainer
