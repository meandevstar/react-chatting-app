import { createTypes } from 'reduxsauce'

export default createTypes(
  `
  GET_CHAT_ATTEMPT
  GET_CHAT_SUCCESS
  GET_CHAT_FAILURE

  GET_ROOM_ATTEMPT
  GET_ROOM_SUCCESS
  GET_ROOM_FAILURE

  GET_USER_ATTEMPT
  GET_USER_SUCCESS
  GET_USER_FAILURE

  CREATE_ROOM_ATTEMPT
  CREATE_ROOM_SUCCESS
  CREATE_ROOM_FAILURE

  SEND_MESSAGE_ATTEMPT
  SEND_MESSAGE_SUCCESS
  SEND_MESSAGE_FAILURE

  CREATE_WORKSPACE_ATTEMPT
  CREATE_WORKSPACE_SUCCESS
  CREATE_WORKSPACE_FAILURE

  GET_WORKSPACE_ATTEMPT
  GET_WORKSPACE_SUCCESS
  GET_WORKSPACE_FAILURE

  SET_WORKSPACE

  RECEIVE_MESSAGE
  `
)