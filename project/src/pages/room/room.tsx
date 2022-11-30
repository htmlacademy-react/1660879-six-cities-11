import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import UserInfo from '../../components/user-info/user-info';
import PropertyGallery from '../../components/property-gallery/property-gallery';
import { Offer } from '../../types/offer';
import PropertyInside from '../../components/property-inside/property-inside';
import { Comment } from '../../types/comment';
import PropertyReviewsBlock from '../../components/property-reviews-block/property-reviews-block';
import NearPlacesBlock from '../../components/near-places-block/near-places-block';
import { getPropertyType } from './../../util';
import { AppRoute, AuthorizationStatus, PropertyType } from './../../const';
import StarsRating from './../../components/stars-rating/stars-rating';
import Map from '../../components/map/map';
import { useEffect, useState } from 'react';
import { fetchOfferData } from '../../services/api';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';
import { getFavoriteOfferSettingStatus } from '../../store/app-data/app-data-selectors';
import { deleteFavoriteOfferAction, setFavoriteOfferAction } from '../../store/api-action';
import { Oval } from 'react-loader-spinner';

function Room() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const favoriteOfferSettingStatus = useAppSelector(getFavoriteOfferSettingStatus);
  const location = useLocation();

  const pathName = location.pathname;
  const pathNameId = Number(pathName.split('/')[2]);

  const [offerData, setOfferData] = useState({
    offer: {} as Offer,
    comments: [] as Comment[],
    nearOffers: [] as Offer[],
  });


  useEffect(() => {
    fetchOfferData(id as string, navigate)
      .then((response) => {
        setOfferData({
          offer: response?.firstResponse.data as Offer,
          comments: response?.secondResponse.data as Comment[],
          nearOffers: response?.thirdResponse.data as Offer[]
        });
      });
  }, [location]);


  const handleCommentsChange = (newComments: Comment[]): void => {
    setOfferData({
      ...offerData,
      comments: newComments
    });
  };


  if (offerData.offer.id === undefined || offerData.offer.id !== pathNameId) {
    return (<LoadingScreen />);
  }


  const { offer, comments, nearOffers } = offerData;
  const selectedAndNearOffers = [offer, ...nearOffers];


  const handleFavoriteButtonClick = () => {
    if (authStatus === AuthorizationStatus.Auth) {

      if (offer.isFavorite) {
        dispatch(deleteFavoriteOfferAction(offerData.offer.id));
        setOfferData({
          ...offerData,
          offer: {
            ...offerData.offer,
            isFavorite: false,
          },
        });
      } else {
        dispatch(setFavoriteOfferAction(offerData.offer.id));
        setOfferData({
          ...offerData,
          offer: {
            ...offerData.offer,
            isFavorite: true,
          },
        });
      }

    } else {
      navigate(AppRoute.Login);
    }
  };

  const iconStyle = offer.isFavorite ? {stroke: 'rgb(68, 129, 195)'} : {};

  return (
    <div className="page">
      <Helmet>
        <title>{`6 cities: ${ offer.title}`}</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <UserInfo />
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
                {favoriteOfferSettingStatus === true
                  ?
                  <Oval
                    height={30}
                    width={30}
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass="property__bookmark-button"
                    ariaLabel='oval-loading'
                    secondaryColor="#4fa94d"
                    strokeWidth={3}
                    strokeWidthSecondary={3}
                  />
                  :
                  <button
                    className="property__bookmark-button button"
                    type="button"
                    onClick={handleFavoriteButtonClick}
                  >
                    <svg
                      className="property__bookmark-icon"
                      width={31}
                      height={33}
                      style={iconStyle}
                    >
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>}
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
            <Map offers={selectedAndNearOffers} unchangeableOfferId={Number(id)} height={580}/>
          </section>
        </section>
        <NearPlacesBlock offers={nearOffers}/>
      </main>
    </div>
  );
}

export default Room;
