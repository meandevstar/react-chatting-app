import React from 'react'
import cx from 'classnames'

const PeopleListItem = ({ participant, checked, active, onItemClick }) => 
  <li className={cx('clearfix', {
    'active': active
  })} onClick={() => onItemClick ? onItemClick() : {}}>
    <img src={participant.imageUrl || 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg'} alt="avatar" />
    <div className="about">
      <div className="name">{participant.name}</div>
      <div className="status">
        <i className="fa fa-circle online"></i> {participant.status}
      </div>
    </div>
    {
      checked !== undefined && 
        <input type="checkbox" checked={checked}/>
    }
  </li>


export default PeopleListItem