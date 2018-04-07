import React from 'react';
import { connect } from 'react-redux'
import 'font-awesome/css/font-awesome.min.css';

import { chat as ChatActions } from '../../core/actions'


class ChatFooter extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      message: ''
    }
  }

  onChangeMessage(e) {
    this.setState({
      message: e.target.value
    })
  }

  send() {
    const { sendMessage, userId, roomId } = this.props
    const { message } = this.state
    const payload = {
      sender: userId,
      room: roomId,
      text: message
    }
    this.setState({ message: '' })

    sendMessage(payload)
  }

  render() {
    const { message } = this.state
    const { roomId } = this.props

    return (
      <div className="chat-message clearfix">
        <textarea name="message-to-send"
                  id="message-to-send"
                  placeholder ="Type your message"
                  rows="3"
                  value={message}
                  disabled={!roomId}
                  onChange={e => this.onChangeMessage(e)}
        ></textarea> 
          <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
          <i className="fa fa-file-image-o"></i>
        <button
          disabled={!roomId}
          onClick={() => this.send()}>
          Send
        </button>
      </div>
    )
  }


}

const mapStateToProps = (state) => ({
  userId: state.user.info._id,
  roomId: state.chat.activeRoomId
})

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (payload) => dispatch(ChatActions.sendMessageAttempt(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatFooter)