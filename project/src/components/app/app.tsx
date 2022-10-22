import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import Room from '../../pages/room/room';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  placesCount: number;
  hasAccess: boolean;
}

function App({placesCount, hasAccess}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Main placesCount={placesCount} />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/favorites'
          element={
            <PrivateRoute hasAccess={hasAccess}>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path='/offer/:id'
          element={<Room />}
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
