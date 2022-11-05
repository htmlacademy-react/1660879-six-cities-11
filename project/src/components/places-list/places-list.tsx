import { Offer } from './../../types/offer';
import PlaceCard from './../place-card/place-card';

type PlacesListProps = {
  offers: Offer[];
  onPlaceListMouseEnter(id: number): void;
}

function PlacesList({offers, onPlaceListMouseEnter}: PlacesListProps) {

  const handleCardMouseEnter = (id: number): void => {
    onPlaceListMouseEnter(id);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((it) => (
        <PlaceCard offer={it} key={it.id} onCardMouseEnter={handleCardMouseEnter}/>
      ))}
    </div>
  );
}

export default PlacesList;
