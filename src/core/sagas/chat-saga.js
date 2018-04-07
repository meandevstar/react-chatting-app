import { call, put, takeEvery, select, take, fork, cancel, takeLatest } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { toastr } from 'react-redux-toastr'
import { push } from 'react-router-redux'
import { prop } from 'ramda'

import openSocket from 'socket.io-client'
import config from '../config'

import { chat as ChatActions, user as UserActions } from '../actions'
import UserActionTypes from '../actions/user/types'
import ChatActionTypes from '../actions/chat/types'

import { getMessages, getRooms, getUsers,
         createRoom, setTokenHeader,
         createWorkspace, getWorkspaces } from '../api'

import ActionTypes from '../actions/chat/types';



function* getChatAttempt({ roomId }) {
  try {
    const response = yield call(getMessages, { roomId })

    console.log(response)

    if (response.ok) {
      yield put(ChatActions.getChatSuccess(response.data))
    } else {
      yield put(ChatActions.getChatFailure(response.data.message))
      toastr.error('Fetching Chat Failed', response.data.message)
    }

  } catch (err) {
    yield put(ChatActions.getChatFailure(err.response.data))
    toastr.error('Fetching Chat Failed', err.response.data)
  }
}

function* getRoomAttempt() {
  try {
    const response = yield call(getRooms)

    if (response.ok) {
      yield put(ChatActions.getRoomSuccess(response.data))
    } else {
      yield put(ChatActions.getRoomFailure(response.data.message))
      toastr.error('Fetching Chat Failed', response.data.message)
    }

  } catch (err) {
    yield put(ChatActions.getRoomFailure(err.response.data))
    toastr.error('Fetching Chat Failed', err.response.data)
  }
}

function* getUserAttempt() {
  try {
    const response = yield call(getUsers)

    if (response.ok) {
      yield put(ChatActions.getUserSuccess(response.data))
    } else {
      yield put(ChatActions.getUserFailure(response.data.message))
      toastr.error('Fetching Users Failed: ', response.data.message)
    }

  } catch (err) {
    yield put(ChatActions.getUserFailure(err.response.data))
    toastr.error('Fetching Users Failed: ', err.response.data)
  }
}

function* createRoomAttempt({ data }) {
  try {
    console.log(data)
    const response = yield call(createRoom, data)

    if (response.ok) {
      yield put(ChatActions.createRoomSuccess(response.data))
      yield put(ChatActions.getRoomAttempt())
      yield put(push('/chat'))
    } else {
      yield put(ChatActions.createRoomFailure(response.data.message))
      toastr.error('Creating Room Failed: ', response.data.message)
    }
    
  } catch (err) {
    yield put(ChatActions.createRoomFailure(err.response.data))
    toastr.error('Creating Room Failed: ', err.response.data)
  }
}

function* createWorkspaceAttempt({ data }) {
  try {
    const response = yield call(createWorkspace, data)

    console.log(response)

    if (response.ok) {
      yield put(ChatActions.createWorkspaceSuccess(response.data))
      yield put(push(`/${response.data.name}`))
    } else {
      yield put(ChatActions.createWorkspaceFailure(response.data.message))
      toastr.error('Creating Workspace Failed: ', response.data.message)
    }
  } catch (err) {
    yield put(ChatActions.createWorkspaceFailure(err.response.data))
    toastr.error('Creating Workspace Failed: ', err.response.data)
  }
}

function* getWorkspaceAttempt() {
  try {
    const response = yield call(getWorkspaces)

    if (response.ok) {
      yield put(ChatActions.getWorkspaceSuccess(response.data))
    } else {
      yield put(ChatActions.getWorkspaceFailure(response.data.message))
      toastr.error('Getting workspaces Failed: ', response.data.message)
    }
  } catch (err) {
    yield put(ChatActions.getWorkspaceFailure(err.response.data))
    toastr.error('Getting workspaces Failed: ', err.response.data)
  }
}




//======================= Socket Configuration ========================//

function connect() {
  const socket = openSocket(config.socketUrl)

  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket)
    })
  })
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('users.login', ({ id, name }) => {
      toastr.info(`${name} become online (${id})`)
    });
    socket.on('users.logout', ({ id, name }) => {
      toastr.info(`${name} went offline (${id})`)
    });
    socket.on('messages.new', (data) => {
      emit(ChatActions.receiveMessage(data))
    });
    socket.on('disconnect', e => {

    });
    return () => {};
  });
}

function* read(socket) {
  const state = yield select()
  const channel = yield call(subscribe, socket)

  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}

function* write(socket) {
  while (true) {
    const { data } = yield take(`${ChatActionTypes.SEND_MESSAGE_ATTEMPT}`)
    socket.emit('messages', data)
  }
}

function* socketWatch(socket) {
  yield fork(read, socket)
  yield fork(write, socket)
}

function* startup() {
  let { user: { token, info } } = yield select()
  
  if (token) {
    setTokenHeader(token)
  } else {
    info = yield take(`${UserActionTypes.SET_USER}`)
  }

  const socket = yield call(connect)

  socket.emit('users.login', { id: info._id, name: info.name })

  const task = yield fork(socketWatch, socket)

  const action = yield take(`${UserActionTypes.LOG_OUT}`)
  yield cancel(task)

  socket.emit('users.logout', { id: info._id, name: info.name })
}


function* watcher() {
  yield takeLatest('persist/REHYDRATE', startup)
  yield takeEvery(ActionTypes.GET_CHAT_ATTEMPT, getChatAttempt)
  yield takeEvery(ActionTypes.GET_ROOM_ATTEMPT, getRoomAttempt)
  yield takeEvery(ActionTypes.GET_USER_ATTEMPT, getUserAttempt)
  yield takeEvery(ActionTypes.CREATE_ROOM_ATTEMPT, createRoomAttempt)
  yield takeEvery(ActionTypes.CREATE_WORKSPACE_ATTEMPT, createWorkspaceAttempt)
  yield takeEvery(ActionTypes.GET_WORKSPACE_ATTEMPT, getWorkspaceAttempt)
  // yield takeEvery(ActionTypes.SEND_MESSAGE_ATTEMPT, sendMessageAttempt)
}

export default watcher;