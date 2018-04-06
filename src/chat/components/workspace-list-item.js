import React from 'react'
import { getHostUrl } from '../../core/helpers'


const PeopleListItem = ({ workspace, onItemClick }) => 
  <li onClick={() => onItemClick ? onItemClick() : {}}>
    <span>{workspace.displayName}</span>&nbsp;&nbsp;&nbsp;
    <span>{getHostUrl() + '/' + workspace.name}</span>
  </li>


export default PeopleListItem