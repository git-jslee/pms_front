import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules';
import ReduxThunk from 'redux-thunk';
import { loginFromStorage } from './modules/auth';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);

// SessionStorage 에 있는 user 정보 Redux 에 넣기..로그인 상태 유지
const loadUser = () => {
  try {
    const user = sessionStorage.getItem('user');
    if (!user) return; //로그인 상태가 아니면 아무것도 안 함.
    // console.log('user', user);
    store.dispatch(loginFromStorage(JSON.parse(user)));
  } catch (e) {
    console.log('index.js>>>localStorage is no working');
  }
};

loadUser();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
