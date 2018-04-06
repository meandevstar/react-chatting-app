import ActionTypes from '../actions/chat/types'
import UserActionTypes from '../actions/user/types'

const initialState = {
  rooms: [],
  users: [],
  messages: [],
  workspaces: [],
  activeRoomId: null,
  activeWorkspaceId: null,
  isLoadingMessages: false,
  isLoadingRooms: false,
  isLoadingUsers: false,
  isLoadingWorkspaces: false,
  isSendingMessage: false,
  error: null
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_CHAT_ATTEMPT:
      return Object.assign({}, state, {
        isLoadingMessages: true,
        activeRoomId: action.roomId
      })

    case ActionTypes.GET_CHAT_SUCCESS:
      return Object.assign({}, state, {
        isLoadingMessages: false,
        messages: action.data
      })

    case ActionTypes.GET_CHAT_FAILURE:
      return Object.assign({}, state, {
        isLoadingMessages: false,
        error: action.data
      })

    case ActionTypes.GET_ROOM_ATTEMPT:
      return Object.assign({}, state, {
        isLoadingRooms: true
      })

    case ActionTypes.GET_ROOM_SUCCESS:
      return Object.assign({}, state, {
        isLoadingRooms: false,
        rooms: action.data 
      })
    
    case ActionTypes.GET_ROOM_FAILURE:
      return Object.assign({}, state, {
        isLoadingRooms: false,
        error: action.data
      })

    case ActionTypes.GET_USER_ATTEMPT:
      return Object.assign({}, state, {
        isLoadingUsers: true
      })

    case ActionTypes.GET_USER_SUCCESS:
      return Object.assign({}, state, {
        isLoadingUsers: false,
        users: action.data
      })

    case ActionTypes.GET_USER_FAILED:
      return Object.assign({}, state, {
        isLoadingUsers: false
      })

    case ActionTypes.CREATE_ROOM_ATTEMPT:
      return Object.assign({}, state, {
        isLoadingRooms: true
      })

    case ActionTypes.CREATE_ROOM_SUCCESS:
      return Object.assign({}, state, {
        isLoadingRooms: false,
        activeRoomId: action.data._id
      })

    case ActionTypes.CREATE_ROOM_FAILED:
      return Object.assign({}, state, {
        isLoadingRooms: false
      })

    case ActionTypes.SEND_MESSAGE_ATTEMPT:
      return Object.assign({}, state, {
        isSendingMessage: false
      })

    case ActionTypes.SEND_MESSAGE_SUCCESS:
      return Object.assign({}, state, {
        isSendingMessage: true
      })
    
    case ActionTypes.SEND_MESSAGE_FAILURE:
      return Object.assign({}, state, {
        isSendingMessage: false,
        error: action.data
      })

    case ActionTypes.RECEIVE_MESSAGE:
      if (state.activeRoomId === action.data.room) {
        const { messages } = state

        return Object.assign({}, state, {
          messages: messages.concat([action.data])
        })
      } else {
        return state
      }
    
    case ActionTypes.CREATE_WORKSPACE_ATTEMPT:
      return Object.assign({}, state, {
        isLoadingWorkspaces: true
      })

    case ActionTypes.CREATE_WORKSPACE_SUCCESS:
      return Object.assign({}, state, {
        isLoadingWorkspaces: false,
        activeWorkspaceId: action.data._id
      })

    case ActionTypes.CREATE_WORKSPACE_FAILED:
      return Object.assign({}, state, {
        isLoadingWorkspaces: false,
        error: action.data
      })

    case ActionTypes.GET_WORKSPACE_ATTEMPT:
      return Object.assign({}, state, {
        isLoadingWorkspaces: true,
      })
    
    case ActionTypes.GET_WORKSPACE_SUCCESS:
      return Object.assign({}, state, {
        isLoadingWorkspaces: false,
        workspaces: action.data
      })

    case ActionTypes.GET_WORKSPACE_FAILURE:
      return Object.assign({}, state, {
        isLoadingWorkspaces: false,
        error: action.data
      })

    case ActionTypes.SET_WORKSPACE:
      return Object.assign({}, state, {
        activeWorkspaceId: action.workspaceId
      })

    case UserActionTypes.LOG_OUT:
      return Object.assign({}, state, {
        activeWorkspaceId: null
      })

    default:
      return state
  }
}


export default chatReducer