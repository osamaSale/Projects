import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import store from "./redux/store"
import { Provider } from "react-redux"
import axios from 'axios';


/*  axios.defaults.baseURL = `http://localhost:5000/`  */
axios.defaults.baseURL = `https://chat-server-bz17.onrender.com/`
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

