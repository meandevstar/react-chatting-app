import { call, put, fork, takeLatest } from 'redux-saga/effects'
import { toastr } from 'react-redux-toastr'
import { push } from 'react-router-redux'

import { loginUser, registerUser, setTokenHeader } from '../api'
import { user as UserActions } from '../actions'
import ActionTypes from '../actions/user/types'

const { apiFailed, apiSuccess, setUserInfo, setToken } = UserActions

function* handleSuccess(response) {
  yield put(apiSuccess())
  yield put(setToken(response.token))
  yield put(setUserInfo(response.user))
  yield call(setTokenHeader, response.token)
  toastr.success('Welcome ' + response.user.name + '!')
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* registerUserAttempt({ data }) {
  try {
    const response = yield call(registerUser, data)
    
    if (response.ok) {
      yield call(handleSuccess, response.data)
    } else {
      yield put(apiFailed());
      toastr.error('Registration Failed', response.data.message)
    }
  } catch (err) {
    yield put(apiFailed());
    toastr.error('Registration Failed', err.response.data.message)
  }
}

function* loginUserAttempt({ data }) {
  try {
    const response = yield call(loginUser, data)

    if (response.ok) {
      yield call(handleSuccess, response.data)
      yield put(push('/'))
    } else {
      yield put(apiFailed())
      toastr.error('Login Failed', response.data.message)
    }

  } catch (err) {
    yield put(apiFailed())
    toastr.error('Login Failed', err.response.data.message)
  }
}



function* watcher() {
  yield takeLatest(ActionTypes.REGISTER_USER_ATTEMPT, registerUserAttempt)
  yield takeLatest(ActionTypes.LOGIN_USER_ATTEMPT, loginUserAttempt)
}

export default watcher;