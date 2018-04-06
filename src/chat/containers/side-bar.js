import React from 'react';
import { connect } from 'react-redux'
import { find, reject, propEq } from 'ramda'
import { push } from 'react-router-redux'
import 'font-awesome/css/font-awesome.min.css';

import { chat as ChatActions } from '../../core/actions'
import PeopleListItem from '../components/people-list-item'
import AddRoomButton from '../components/add-room-button'
import ContactSearch from '../components/contact-search'


class SideBar extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
    const { getRooms } = this.props

    getRooms()
  }

  getActiveChats(roomId) {
    const { getChats } = this.props
  
    getChats(roomId)
  }

  render() {
    const { rooms, user, activeRoomId, goToAddRoomPage } = this.props

    return (
      <div className="people-list">
        <ContactSearch />
        <AddRoomButton goToAddRoomPage={goToAddRoomPage}/>
        <ul className="list">
        {
          rooms && rooms.map((room, index) => 
            <PeopleListItem
              key={index}
              active={room._id === activeRoomId}
              participant={getOtherPeople(room.participants, user)}
              onItemClick={() => this.getActiveChats(room._id)}
            />
          )
        }
        </ul>
      </div>
    )
  }
  
}



const getOtherPeople = (participants, me) => {
  const otherParticipants = reject(propEq('_id', me._id))(participants)

  return otherParticipants.length ? otherParticipants[0] : {}
}

const mapStateToProps = state => ({
  activeRoomId: state.chat.activeRoomId,
  rooms: state.chat.rooms,
  user: state.user.info
})

const mapDispatchToProps = dispatch => ({
  getChats: (activeRoomId) => dispatch(ChatActions.getChatAttempt(activeRoomId)),
  getRooms: () => dispatch(ChatActions.getRoomAttempt()),
  goToAddRoomPage: () => dispatch(push('/chat/add-room'))
})


export default connect(mapStateToProps, mapDispatchToProps)(SideBar)