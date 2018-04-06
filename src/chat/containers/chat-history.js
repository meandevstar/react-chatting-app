import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import 'font-awesome/css/font-awesome.min.css';


import Message from '../components/message'


class ChatHistory extends React.Component {

  constructor (props) {
    super(props)
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  
  componentDidMount() {
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const { messages, me } = this.props

    return (
      <div className="chat-history">
        <ul>
          {
            messages && messages.map((message, index) => 
              <Message
                key={index}
                message={message}
                user={me}
              />)
          }
          
          {/* <li>
            <i className="fa fa-circle online"></i>
            <i className="fa fa-circle online" style={{ color: '#AED2A6' }}></i>
            <i className="fa fa-circle online" style={{ color: '#DAE9DA' }}></i>
            <span className="status-text">Vincente is writing...</span>
          </li> */}
        </ul>
        <div style={{ float:"left", clear: "both" }}
          ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  messages: state.chat.messages,
  me: state.user.info
})

export default connect(mapStateToProps, null)(ChatHistory)