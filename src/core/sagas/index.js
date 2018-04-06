import { fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import userSaga from './user-saga'
import chatSaga from './chat-saga'

export default function* () {
  yield fork(userSaga)
  yield fork(chatSaga)
}