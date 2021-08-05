import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './redux/redux-store';
import App from './App';
//import StoreContext, { Provider } from './StoreContext';
import { Provider } from 'react-redux';



 
  ReactDOM.render(
   
      <Provider store={store}>
        <App />
      </Provider>,
    document.getElementById('root')
  );






// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();