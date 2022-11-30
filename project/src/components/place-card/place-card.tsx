import { useLocation, Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Offer } from '../../types/offer';
import StarsRating from '../stars-rating/stars-rating';
import { PropertyType } from './../../const';
import { getPropertyType } from './../../util';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSelectedOffer } from '../../store/app-process/app-process-slice';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';
import { deleteFavoriteOfferAction,setFavoriteOfferAction } from '../../store/api-action';
import { Oval } from 'react-loader-spinner';
import { getFavoriteOfferSettingStatus } from '../../store/app-data/app-data-selectors';
import { useEffect, useState } from 'react';

type PlaceCardProps = {
  offer: Offer;
}

type PropertyKeyType = keyof typeof PropertyType


function PlaceCard({offer}: PlaceCardProps): JSX.Element {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthorizationStatus);
  const favoriteOfferSettingStatus = useAppSelector(getFavoriteOfferSettingStatus);
  const navigate = useNavigate();

  const [offerId, setOfferId] = useState<number | undefined>(undefined);

  useEffect(() => {
    setOfferId(undefined);
  }, [offer]);

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


  const handleFavoriteButtonClick = () => {
    if (authStatus === AuthorizationStatus.Auth) {

      if (offer.isFavorite) {
        setOfferId(offer.id);
        dispatch(deleteFavoriteOfferAction(offer.id));
      } else {
        setOfferId(offer.id);
        dispatch(setFavoriteOfferAction(offer.id));
      }

    } else {
      navigate(AppRoute.Login);
    }
  };

  const iconStyle = offer.isFavorite ? {stroke: 'rgb(68, 129, 195)'} : {};

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
          {favoriteOfferSettingStatus === true && offer.id === offerId
            ?
            <Oval
              height={18}
              width={19}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              ariaLabel='oval-loading'
              secondaryColor="#4fa94d"
              strokeWidth={3}
              strokeWidthSecondary={3}
            />
            :
            <button
              className="place-card__bookmark-button button"
              type="button"
              onClick={handleFavoriteButtonClick}
            >
              <svg
                className="place-card__bookmark-icon"
                width={18}
                height={19}
                style={iconStyle}
              >
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>}
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
