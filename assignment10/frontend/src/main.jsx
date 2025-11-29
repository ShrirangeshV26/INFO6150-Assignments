import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import CssBaseline from '@mui/material/CssBaseline';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>
);
