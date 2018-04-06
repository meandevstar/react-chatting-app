import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import AppRoutes from './routes';
import configureStore from './core/configure-store';
import registerServiceWorker from './registerServiceWorker';

import './assets/index.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

const store = configureStore();

const App = (
  <Provider store={store.store}>
    <PersistGate loading={null} persistor={store.persistor}>
      <AppRoutes history={store.history}/>
    </PersistGate>
  </Provider>
)

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
