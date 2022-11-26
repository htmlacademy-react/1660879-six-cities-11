import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import Navigation from '../../components/navigation/navigation';
import PropertyGallery from '../../components/property-gallery/property-gallery';
import { Offer } from '../../types/offer';
import PropertyInside from '../../components/property-inside/property-inside';
import { Comment } from '../../types/comment';
import PropertyReviewsBlock from '../../components/property-reviews-block/property-reviews-block';
import NearPlacesBlock from '../../components/near-places-block/near-places-block';
import { getPropertyType } from './../../util';
import { APIRoute, AppRoute, PropertyType } from './../../const';
import StarsRating from './../../components/stars-rating/stars-rating';
import Map from '../../components/map/map';
import { useEffect, useState } from 'react';
import { createAPI } from '../../services/api';
import LoadingScreen from '../../components/loading-screen/loading-screen';

type RoomProps = {
  authStatus: string;
}

function Room({authStatus}: RoomProps) {
  const { id } = useParams();
  const api = createAPI();
  const navigate = useNavigate();

  const [offer, setOffer] = useState<Offer | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [nearOffers, setNearOffers] = useState<Offer[] | null>(null);


  useEffect(() => {
    api.get<Offer>(`${APIRoute.Offers}/${id as string}`)
      .then((response) => setOffer(response.data))
      .catch(() => navigate(AppRoute.NoProperty));
    api.get<Comment[]>(`${APIRoute.Comments}/${id as string}`)
      .then((response) => setComments(response.data))
      .catch(() => navigate(AppRoute.NoProperty));
    api.get<Offer[]>(`${APIRoute.Offers}/${id as string}/nearby`)
      .then((response) => setNearOffers(response.data))
      .catch(() => navigate(AppRoute.NoProperty));
  }, []);


  const handleCommentsChange = (newComments: Comment[]): void => {
    setComments(newComments);
  };


  if (offer === null || comments === null || nearOffers === null) {
    return (<LoadingScreen />);
  }

  const selectedAndNearOffers = [offer, ...nearOffers];

  return (
    <div className="page">
      <Helmet>
        <title>{`6 cities: ${ offer.title}`}</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <Navigation />
          </div>
        </div>
      </header>
      <main className="page__main page__main--property">
        <section className="property">
          <PropertyGallery offer={offer}/>
          <div className="property__container container">
            <div className="property__wrapper">
              { offer.isPremium
                ?
                <div className="property__mark">
                  <span>Premium</span>
                </div>
                : ''}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                    {/* TODO setState */}
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <StarsRating rating={offer.rating} />
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {getPropertyType(offer.type as keyof typeof PropertyType)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {`${offer.bedrooms} Bedrooms`}
                </li>
                <li className="property__feature property__feature--adults">
                  {`Max ${offer.maxAdults} adults`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">{`€${offer.price}`}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <PropertyInside offer={offer}/>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper  user__avatar-wrapper ${offer.host.isPro ? 'property__avatar-wrapper--pro' : ''}`}>
                    <img
                      className="property__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width={74}
                      height={74}
                      alt={offer.host.name}
                    />
                  </div>
                  <span className="property__user-name">{offer.host.name}</span>
                  <span className="property__user-status">{offer.host.isPro ? 'Pro' : ''}</span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <PropertyReviewsBlock comments={comments} authStatus={authStatus} handleCommentsChange={handleCommentsChange} />
            </div>
          </div>
          <section className="property__map map">
            <Map offers={selectedAndNearOffers} selectedOfferId={Number(id)}></Map>
          </section>
        </section>
        <NearPlacesBlock offers={nearOffers}/>
      </main>
    </div>
  );
}

export default Room;
