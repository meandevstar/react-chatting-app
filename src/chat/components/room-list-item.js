import React from 'react'
import cx from 'classnames'
import Male from '../../assets/avatar-male.svg'
import Female from '../../assets/avatar-female.svg'
import Group from '../../assets/avatar-group.svg'

const RoomListItem = ({ participants, checked, active, title, onItemClick }) => 
  <li className={cx('clearfix', {
        'active': active
      })}
      onClick={() => onItemClick ? onItemClick() : {}}>
    <img src={participants && participants.length === 1 ? Male : Group} alt="avatar" />
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