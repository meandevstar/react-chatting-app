import React from 'react'
import cx from 'classnames'

const ContactListItem = ({ user, checked, onItemClick }) => 
  <li onClick={() => onItemClick ? onItemClick() : {}}>
    {/* <img src={'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg'} alt="avatar" /> */}
    <div className="about">
      <input type="checkbox" checked={checked}/>
      <span>{user.name}</span>
    </div>
  </li>


export default ContactListItem