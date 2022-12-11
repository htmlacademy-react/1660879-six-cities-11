import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import UserInfo from '../../components/user-info/user-info';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import { useState, useEffect } from 'react';
import TabsList from '../../components/tabs-list/tabs-list';
import { CitiesList } from '../../const';
import { useAppSelector } from '../../hooks/index';
import MainEmpty from '../../components/main-empty/main-empty';
import Sort from '../../components/sort/sort';
import { Offer } from '../../types/offer';
import { getOffers } from '../../store/app-data/app-data-selectors';
import { getCity, getSortType } from '../../store/app-process/app-process-selectors';
import { sortOffers } from '../../util';

function Main(): JSX.Element {

  const sortType = useAppSelector(getSortType);
  const allOffers = useAppSelector(getOffers);
  const city = useAppSelector(getCity);

  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const sortedOffers = sortOffers(city, allOffers, sortType);
    setOffers(sortedOffers);
  }, [city, allOffers, sortType]);


  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <UserInfo />
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <TabsList citiesList={CitiesList}/>
        <div className="cities">
          {offers.length === 0
            ?
            <MainEmpty city={city}></MainEmpty>
            :
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b
                  className="places__found"
                >{offers.length} places to stay in {city}
                </b>
                <Sort />
                <PlacesList offers={offers} />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map offers={offers} height={800}/>
                </section>
              </div>
            </div>}
        </div>
      </main>
    </div>
  );
}

export default Main;
