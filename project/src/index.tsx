import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { commentsToOfferN3 } from './mocks/comments';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchOffersAction, checkAuth } from './store/api-action';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuth());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App
        comments={commentsToOfferN3}
      />
    </Provider>
  </React.StrictMode>,
);
