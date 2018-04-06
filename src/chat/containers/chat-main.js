import React from 'react';
import { connect } from 'react-redux';

import { chat as ChatActions } from '../../core/actions'
import { unauthenticated } from '../../common/components'

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


export default connect(null, null)(ChatContainer);
