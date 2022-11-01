import { Helmet } from 'react-helmet-async';
import FavoritesEmptyBlock from '../../components/favorites-empty-block/favorites-empty-block';
import FavoritesNotEmptyBlock from '../../components/favorites-not-empty-block/favorites-not-empty-block';
import Logo from '../../components/logo/logo';
import Navigation from '../../components/navigation/navigation';
import { Offer } from '../../types/offer';

type FavoritesProps = {
  offers: Offer[];
  cities: string[];
}

function Favorites({offers, cities}: FavoritesProps) {
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
