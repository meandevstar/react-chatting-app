import React from 'react'
import 'font-awesome/css/font-awesome.min.css';

const AddRoomButton = ({ goToAddRoomPage }) =>
  <div className="search" onClick={() => goToAddRoomPage()}>
    <i className="fa fa-plus"> Add Room...</i>
  </div>

export default AddRoomButton