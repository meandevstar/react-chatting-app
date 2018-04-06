import ActionTypes from './types';

export const getChatAttempt = (roomId) => ({ type: ActionTypes.GET_CHAT_ATTEMPT, roomId })

export const getChatSuccess = (data) => ({ type: ActionTypes.GET_CHAT_SUCCESS, data })

export const getChatFailure = (data) => ({ type: ActionTypes.GET_CHAT_FAILURE, data})

export const getRoomAttempt = () => ({ type: ActionTypes.GET_ROOM_ATTEMPT})

export const getRoomSuccess = (data) => ({ type: ActionTypes.GET_ROOM_SUCCESS, data})

export const getRoomFailure = (data) => ({ type: ActionTypes.GET_ROOM_FAILURE, data})

export const getUserAttempt = (workspaceId) => ({ type: ActionTypes.GET_USER_ATTEMPT, workspaceId })

export const getUserSuccess = (data) => ({ type: ActionTypes.GET_USER_SUCCESS, data })

export const getUserFailure = (data) => ({ type: ActionTypes.GET_USER_FAILURE, data })

export const createRoomAttempt = (data) => ({ type: ActionTypes.CREATE_ROOM_ATTEMPT, data })

export const createRoomSuccess = (data) => ({ type: ActionTypes.CREATE_ROOM_SUCCESS, data })

export const createRoomFailure = (data) => ({ type: ActionTypes.CREATE_ROOM_FAILURE, data })

export const sendMessageAttempt = (data) => ({ type: ActionTypes.SEND_MESSAGE_ATTEMPT, data })

export const sendMessageSuccess = () => ({ type: ActionTypes.SEND_MESSAGE_SUCCESS })

export const sendMessageFailure = (data) => ({ type: ActionTypes.SEND_MESSAGE_FAILURE, data})

export const receiveMessage = (data) => ({ type: ActionTypes.RECEIVE_MESSAGE, data })

export const createWorkspaceAttempt = (data) => ({ type: ActionTypes.CREATE_WORKSPACE_ATTEMPT, data })

export const createWorkspaceSuccess = (data) => ({ type: ActionTypes.CREATE_WORKSPACE_SUCCESS, data })

export const createWorkspaceFailure = (data) => ({ type: ActionTypes.CREATE_WORKSPACE_FAILURE, data })

export const getWorkspaceAttempt = () => ({ type: ActionTypes.GET_WORKSPACE_ATTEMPT })

export const getWorkspaceSuccess = (data) => ({ type: ActionTypes.GET_WORKSPACE_SUCCESS, data })

export const getWorkspaceFailure = (data) => ({ type: ActionTypes.GET_WORKSPACE_FAILURE, data })

export const setWorkspace = (workspaceId) => ({ type: ActionTypes.SET_WORKSPACE, workspaceId })