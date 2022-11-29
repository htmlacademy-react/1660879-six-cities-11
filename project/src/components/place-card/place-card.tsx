import { useLocation, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offer } from '../../types/offer';
import StarsRating from '../stars-rating/stars-rating';
import { PropertyType } from './../../const';
import { getPropertyType } from './../../util';
import { useAppDispatch } from '../../hooks';
import { setSelectedOffer } from '../../store/app-process/app-process-slice';

type PlaceCardProps = {
  offer: Offer;
}

type PropertyKeyType = keyof typeof PropertyType


function PlaceCard({offer}: PlaceCardProps): JSX.Element {
  const location = useLocation();
  const dispatch = useAppDispatch();

  let articleClassName;
  let divClassName;

  switch(location.pathname) {
    case AppRoute.Root :
      articleClassName = 'cities__card place-card';
      divClassName = 'cities__image-wrapper place-card__image-wrapper';
      break;
    case AppRoute.Favorites :
      articleClassName = 'favorites__card place-card';
      divClassName = 'favorites__image-wrapper place-card__image-wrapper';
      break;
    default :
      articleClassName = 'near-places__card place-card';
      divClassName = 'near-places__image-wrapper place-card__image-wrapper';
  }


  return (
    <article
      className={articleClassName}
      onMouseEnter={() => dispatch(setSelectedOffer(offer.id))}
    >
      {offer.isPremium
        ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        : ''}
      <div className={divClassName}>
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={260}
            height={200}
            alt={offer.title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button button"
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <StarsRating rating={offer.rating} />
          </div>
        </div>
        <h2 className="place-card__name">
          <Link
            to={`/offer/${offer.id}`}
          >
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{getPropertyType(offer.type as PropertyKeyType)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
