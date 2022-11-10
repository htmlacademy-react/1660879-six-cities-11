import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { AuthorizationStatus } from './const';
import { offers } from './mocks/offers';
import { commentsToOfferN3 } from './mocks/comments';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        authStatus={AuthorizationStatus.Auth}
        offers={offers}
        comments={commentsToOfferN3}
      />
    </Provider>
  </React.StrictMode>,
);
