import ActionTypes from '../actions/chat/types'

const initialState = {
  rooms: [],
  users: [],
  messages: [],
  activeRoomId: null,
  isLoadingMessages: false,
  isLoadingRooms: false,
  isLoadingUsers: false,
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

    default:
      return state
  }
}


export default chatReducer