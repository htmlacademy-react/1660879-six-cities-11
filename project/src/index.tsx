import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const Setting = {
  PlacesCount: 200,
  HasAccess: true,
} as const;


root.render(
  <React.StrictMode>
    <App
      placesCount={Setting.PlacesCount}
      hasAccess={Setting.HasAccess}
    />
  </React.StrictMode>,
);
