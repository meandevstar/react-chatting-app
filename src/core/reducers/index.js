import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'
import { routerReducer } from 'react-router-redux'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user-reducer'
import chatReducer from './chat-reducer'


const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const chatPersistConfig = {
  key: 'chat',
  storage,
  whitelist: ['activeWorkspaceId', 'workspaces']
}

const appReducer = combineReducers({
  user: userReducer,
  chat: persistReducer(chatPersistConfig, chatReducer),
  form: formReducer,
  toastr: toastrReducer,
  routing: routerReducer
})

export default persistReducer(rootPersistConfig, appReducer)
