import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import CoordinatesProvider from './providers/coordinates/coordinates';
import UserProvider from './providers/user/user';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <UserProvider>
    <CoordinatesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CoordinatesProvider>
  </UserProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
