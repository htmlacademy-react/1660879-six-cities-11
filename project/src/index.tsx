import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { AuthorizationStatus } from './const';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const Setting = {
  PlacesCount: 200,
  AuthStatus: AuthorizationStatus.NoAuth,
} as const;


root.render(
  <React.StrictMode>
    <App
      placesCount={Setting.PlacesCount}
      authStatus={Setting.AuthStatus}
    />
  </React.StrictMode>,
);
