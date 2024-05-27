import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import '@/assets/css/ant.mobile.scss';

import { AliveScope } from 'react-activation';

import 'virtual:svg-icons-register';
import { Provider } from 'react-redux';
import store from './store';

import 'virtual:uno.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <AliveScope>
        <App />
      </AliveScope>
    </BrowserRouter>
  </Provider>
);
