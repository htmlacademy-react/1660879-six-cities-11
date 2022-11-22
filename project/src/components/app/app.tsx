import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import Room from '../../pages/room/room';
import PrivateRoute from '../private-route/private-route';
import { Comment } from '../../types/comment';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { getAllFavoriteOffersAndCities } from '../../util';
import { useAppSelector } from '../../hooks';

type AppProps = {
  authStatus: string;
  comments: Comment[];
}

function App({authStatus, comments}: AppProps): JSX.Element {

  const offers = useAppSelector((state) => state.offers);

  const {allFavoriteOffers, favoriteCities} = getAllFavoriteOffersAndCities(offers);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<Main/>}
          />
          <Route
            path={AppRoute.Login}
            element={<Login />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authStatus={authStatus}>
                <Favorites offers={allFavoriteOffers} cities={favoriteCities}/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Room}
            element={<Room offers={offers} comments={comments} authStatus={authStatus}/>}
          />
          <Route
            path='*'
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
