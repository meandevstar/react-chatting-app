import React from 'react'
import cx from 'classnames'

const RoomListItem = ({ participants, checked, active, title, onItemClick }) => 
  <li className={cx('clearfix', {
        'active': active
      })}
      onClick={() => onItemClick ? onItemClick() : {}}>
    <img src={'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg'} alt="avatar" />
    <div className="about">
      <div className="name">{title || getRoomName(participants)}</div>
      {participants && participants.length === 1 &&
        <div className="status">
          <i className="fa fa-circle online"></i> {participants[0].status}
        </div>
      }
    </div>
    {
      checked !== undefined && 
        <input type="checkbox" checked={checked}/>
    }
  </li>

const getRoomName = (participants) => {
  if (!participants) return '';

  let participantNames = participants.map(participant => participant.name).join(', ')

  if (participants.length === 1) {
    participantNames = `${participants[0].name}`
  }

  return participantNames
}



export default RoomListItem