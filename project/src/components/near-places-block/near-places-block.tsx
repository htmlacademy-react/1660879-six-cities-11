import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';
import { useState } from 'react';

type NearPlacesBlockProps = {
  offers: Offer[];
}

function NearPlacesBlock({offers}: NearPlacesBlockProps) {
  const [, setActiveCard] = useState<number | undefined>(undefined);

  const onCardMouseEnter = (id: number): void => {
    setActiveCard(id);
  };

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">
      Other places in the neighbourhood
        </h2>
        <div className="near-places__list places__list">
          {offers.map((it) => <PlaceCard offer={it} key={it.id} onCardMouseEnter={onCardMouseEnter}/>)}
        </div>
      </section>
    </div>
  );
}

export default NearPlacesBlock;
