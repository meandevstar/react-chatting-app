import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'
import { routerReducer } from 'react-router-redux'

import userReducer from './user-reducer'
import chatReducer from './chat-reducer'

export default combineReducers({
  user: userReducer,
  chat: chatReducer,
  form: formReducer,
  toastr: toastrReducer,
  routing: routerReducer
})
