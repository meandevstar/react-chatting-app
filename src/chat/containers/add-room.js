import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { find, propEq, reject } from 'ramda'

import { chat as ChatActions } from '../../core/actions'
import PeopleListItem from '../components/people-list-item'


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

  render() {
    const { users } = this.props
    const { participants, name } = this.state

    return (
      <div className="container clearfix">
        <div className="contact-list">
          <h2>Add people to create a room </h2>
          <input type="text" placeholder="Room name" value={name} />
        </div>
        <div>
          <ul className="list">
          {
            users.map((user, index) =>
              <PeopleListItem
                key={index}
                participant={user}
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