import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import UserInfo from '../../components/user-info/user-info';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import { useState } from 'react';
import TabsList from '../../components/tabs-list/tabs-list';
import { CitiesList, SortType } from '../../const';
import { useAppSelector } from '../../hooks/index';
import MainEmpty from '../../components/main-empty/main-empty';
import { useEffect } from 'react';
import Sort from '../../components/sort/sort';
import { Offer } from '../../types/offer';
import { getOffers } from '../../store/app-data/app-data-selectors';
import { getCity } from '../../store/app-process/app-process-selectors';

function Main(): JSX.Element {

  const allOffers = useAppSelector(getOffers);
  const city = useAppSelector(getCity);
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    //фильтруем офферы по выбранной вкладке
    const filteredOffers = allOffers.filter((it) => it.city.name === city);
    setOffers(filteredOffers);
  }, [city, allOffers]);

  const sortOffers = (sortType: keyof typeof SortType): void => {
    let sortedOffersBySortType;
    switch (sortType) {
      case SortType.Default:
        sortedOffersBySortType = allOffers.filter((it) => it.city.name === city);
        break;
      case SortType.PriceLowToHigh:
        sortedOffersBySortType = [...offers].sort((a, b) => a.price - b.price);
        break;
      case SortType.PriceHighToLow:
        sortedOffersBySortType = [...offers].sort((a, b) => b.price - a.price);
        break;
      case SortType.RatingHighToLow:
        sortedOffersBySortType = [...offers].sort((a, b) => b.rating - a.rating);
        break;
      default:
        sortedOffersBySortType = allOffers.filter((it) => it.city.name === city);
    }
    setOffers(sortedOffersBySortType);
  };

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
                <b className="places__found">{offers.length} places to stay in {city}</b>
                <Sort sortOffers={sortOffers}/>
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
