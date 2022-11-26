import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import Room from '../../pages/room/room';
import PrivateRoute from '../private-route/private-route';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { getAllFavoriteOffersAndCities } from '../../util';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';
import NoProperty from '../no-property/no-property';

function App(): JSX.Element {

  const offers = useAppSelector((state) => state.offers);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const {allFavoriteOffers, favoriteCities} = getAllFavoriteOffersAndCities(offers);

  if (isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

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
              <PrivateRoute authStatus={authorizationStatus}>
                <Favorites offers={allFavoriteOffers} cities={favoriteCities}/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Room}
            element={<Room authStatus={authorizationStatus}/>}
          />
          <Route
            path={AppRoute.NoProperty}
            element={<NoProperty />}
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
