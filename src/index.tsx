import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import store from './redux/store';
import { Provider } from 'react-redux';
import {
  StompSessionProvider,
  // useSubscription,
} from "react-stomp-hooks";
import { WEB_SOCKET_CONNECTION_URL } from './Utility/Config';
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
    // <StompSessionProvider
  
    // url={WEB_SOCKET_CONNECTION_URL}
    // debug={(str) => {
    //   console.log(str);
     
    // }}>
  <GoogleOAuthProvider clientId="761275914869-9di23dhnobemane7a9gse8upsnmi6ngq.apps.googleusercontent.com">
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
  </GoogleOAuthProvider>
  // </StompSessionProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
