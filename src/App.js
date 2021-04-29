import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import Routes from './routes/Routes';

import authReducer from './store/reducers/auth';

export default function App() {

  const rootReducer = combineReducers({
    auth: authReducer
  });
  
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  return (
    <div className="App">
      <Provider store={store}>
        <Routes />
      </Provider>
    </div>
  );
}