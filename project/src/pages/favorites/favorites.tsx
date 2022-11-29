import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import FavoritesEmptyBlock from '../../components/favorites-empty-block/favorites-empty-block';
import FavoritesNotEmptyBlock from '../../components/favorites-not-empty-block/favorites-not-empty-block';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import Logo from '../../components/logo/logo';
import Navigation from '../../components/user-info/user-info';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteOffersAction } from '../../store/api-action';
import { getFavoriteOffers, getFavoriteOffersDataLoadingStatus } from '../../store/app-data/app-data-selectors';
import { getFavoriteCities } from '../../util';

function Favorites() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, []);

  const offers = useAppSelector(getFavoriteOffers);
  const isFavoriteOffersDataLoading = useAppSelector(getFavoriteOffersDataLoadingStatus);
  const cities = getFavoriteCities(offers);

  let divClassName;
  let mainClassName;

  switch(offers.length) {
    case 0:
      divClassName = 'page page--favorites-empty';
      mainClassName = 'page__main page__main--favorites page__main--favorites-empty';
      break;
    default:
      divClassName = 'page';
      mainClassName = 'page__main page__main--favorites';
  }

  if (isFavoriteOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className={divClassName}>
      <Helmet>
        <title>{offers.length ? '6 cities: favorites' : '6 cities: favorites empty'}</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <Navigation />
          </div>
        </div>
      </header>
      <main className={mainClassName}>
        <div className="page__favorites-container container">
          {offers.length
            ?
            <FavoritesNotEmptyBlock
              offers={offers}
              cities={cities}
            />
            :
            <FavoritesEmptyBlock />}
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </a>
      </footer>
    </div>

  );
}

export default Favorites;
