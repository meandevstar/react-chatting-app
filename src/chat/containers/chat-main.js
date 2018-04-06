import React from 'react'
import { connect } from 'react-redux'

import { SideBar, ChatHeader, ChatHistory, ChatFooter } from './index'

const ChatContainer = () =>
  <div className="container clearfix">
    <SideBar />
    <div className="chat">
      <ChatHeader />
      <ChatHistory />
      <ChatFooter />
    </div>
  </div>


export default ChatContainer
