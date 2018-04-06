import React from 'react';
import { connect } from 'react-redux'
import { find, propEq, reject } from 'ramda'

import 'font-awesome/css/font-awesome.min.css';



const ChatHeader = ({ participantNames, messageLength }) =>
  participantNames ? 

  (<div className="chat-header clearfix">
    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
    
    <div className="chat-about">
      <div className="chat-with">{participantNames}</div>
      <div className="chat-num-messages">
        {messageLength ?
          `Already ${messageLength} messages`:
          'No message yet'}
      </div>
    </div>
    <i className="fa fa-star"></i>
  </div>) :
  (
    <div className="chat-header clearfix">
      <h2>Please select a room to start chat</h2>
    </div>
  )



const mapStateToProps = state => {

  const messageLength = state.chat.messages.length
  const rooms = state.chat.rooms;
  const { user: { info } } = state
  const room = find(propEq('_id', state.chat.activeRoomId))(rooms) || {}
  let participantNames = room.participants ?
      reject(propEq('_id', info._id))(room.participants)
      .map(participant => participant.name)
      .join(', ') : null

  if (room.participants && room.participants.length === 1) {
    participantNames = `${room.participants[0].name} (you)`
  }


  return {
    messageLength,
    room,
    participantNames
  }
}

export default connect(mapStateToProps, null)(ChatHeader)