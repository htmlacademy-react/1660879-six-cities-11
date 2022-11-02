import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type FavoritesNotEmptyBlockProps = {
  offers: Offer[];
  cities: string[];
}

function FavoritesNotEmptyBlock({offers, cities}: FavoritesNotEmptyBlockProps) {
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {cities.map((it) => (
          <li className="favorites__locations-items" key={it}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{it}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {offers
                .filter((el) => el.city.name === it)
                .map((offer) => (
                  <PlaceCard
                    key={offer.id}
                    offer={offer}
                  />
                ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FavoritesNotEmptyBlock;
