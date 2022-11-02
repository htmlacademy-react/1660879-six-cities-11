import { Offer } from './../../types/offer';
import PlaceCard from './../place-card/place-card';
import { useState } from 'react';

type PlacesListProps = {
  offers: Offer[];
}

function PlacesList({offers}: PlacesListProps) {
  const [, setActiveCard] = useState<number | undefined>(undefined);

  const handleCardMouseEnter = (id: number): void => {
    setActiveCard(id);
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
