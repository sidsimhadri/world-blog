  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import './index.css';
  import { Auth0Provider } from '@auth0/auth0-react';
  import App from './App';
  import reportWebVitals from './reportWebVitals';
  import '@fontsource/roboto/300.css';
  import '@fontsource/roboto/400.css';
  import '@fontsource/roboto/500.css';
  import '@fontsource/roboto/700.css';


  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Auth0Provider
      domain="dev-dbpcf2w1k60igzy7.us.auth0.com"
      clientId="y24i0GPUKcDYe7tF44Ttgnq2bJieyyIp"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
        <App />
        </Auth0Provider>
    </React.StrictMode>
    
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
