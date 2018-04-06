import React from 'react';
import cx from 'classnames'
import 'font-awesome/css/font-awesome.min.css';

import { getChatDateString } from '../../core/helpers'


const Message = ({ message, user }) =>
  <li className="clearfix">
    <div className={cx('message-data', {
      'align-right': message.sender._id !== user._id
    })}>
      <span className="message-data-time" >{getChatDateString(message.createdAt)}</span> &nbsp; &nbsp;
      <span className="message-data-name" >
        {message.sender._id !== user._id ? message.sender.name : 'You'}
      </span> <i className="fa fa-circle me"></i>
    </div>
    <div className={cx('message', {
      'my-message': message.sender._id === user._id,
      'other-message float-right': message.sender._id !== user._id
    })}>
      {message.text}
    </div>
  </li>


export default Message