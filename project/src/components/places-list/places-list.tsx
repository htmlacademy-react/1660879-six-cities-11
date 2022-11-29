import { Offer } from './../../types/offer';
import PlaceCard from './../place-card/place-card';

type PlacesListProps = {
  offers: Offer[];
}

function PlacesList({offers}: PlacesListProps) {

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((it) => (
        <PlaceCard
          offer={it}
          key={it.id}
        />
      ))}
    </div>
  );
}

export default PlacesList;

