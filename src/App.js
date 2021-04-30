import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import Routes from './routes/Routes';

import authReducer from './store/reducers/auth';

export default function App() {

  const rootReducer = combineReducers({
    auth: authReducer
  });

  const composeEnhancers = composeWithDevTools({
    realtime: true,
    name: 'MyInstance',
    hostname: 'localhost',
    port: 8070 // the port your remotedev server is running at
  })
  
  const store = createStore(rootReducer,composeEnhancers(
    applyMiddleware(ReduxThunk)
  ));

  return (
    <div className="App">
      <Provider store={store}>
        <Routes />
      </Provider>
    </div>
  );
}