import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { find, propEq, reject } from 'ramda'

import { chat as ChatActions } from '../../core/actions'
import ContactListItem from '../components/contact-list-item'


class AddRoom extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      participants: [],
      name: ''
    }
  }

  componentDidMount() {
    const { getUsers } = this.props

    getUsers()
  }

  addUser(user) {
    const { participants } = this.state
    let newParticipants, newIndex = participants.indexOf(user._id);

    if (newIndex !== -1) {
      participants.splice(newIndex, 1)
    } else {
      participants.push(user._id)
    }

    this.setState({ participants })
  }

  createRoom() {
    const { participants, name } = this.state
    const { createRoom, me } = this.props
    const payload = {
      name,
      participants: participants.concat([me._id])
    }

    createRoom(payload)
  }

  onUpdateName(e) {
    this.setState({
      name: e.target.value
    })
  }
  

  render() {
    const { users } = this.props
    const { participants, name } = this.state

    return (
      <div className="container add-room clearfix">
        <div className="contact-list">
          <h2>Add people to create a room </h2>
          <input type="text" placeholder="Room name" value={name} onChange={(e) => this.onUpdateName(e)} />
        </div>
        <div>
          <h3>Workspace Users</h3>
          <ul className="list">
          {
            users.map((user, index) =>
              <ContactListItem
                key={index}
                user={user}
                checked={participants.indexOf(user._id) !== -1}
                onItemClick={() => this.addUser(user)}
              />)
          }
          </ul>
        </div>
        <div>
          <button
            type="button"
            // disabled={participants.length === 0}
            onClick={() => this.createRoom()}>
            create
          </button>
        </div>
      </div>
    )
  }
}



const mapStateToProps = state => {
  const { user: { info } } = state

  return {
    users: reject(user => info._id === user._id)(state.chat.users),
    me: info
  }
}


const mapDispatchToProps = dispatch => ({
  getUsers: (workspaceId) => dispatch(ChatActions.getUserAttempt(workspaceId)),
  createRoom: (payload) => dispatch(ChatActions.createRoomAttempt(payload))
})



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddRoom))