import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUser } from '../../services/user';
import { fetchOffersAction, logoutAction } from '../../store/api-action';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';
import { getFavoriteOffers } from '../../store/app-data/app-data-selectors';
import { clearFavoriteOffers } from '../../store/app-data/app-data-slice';

function UserInfo() {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthorizationStatus);
  const user = getUser();
  const offers = useAppSelector(getFavoriteOffers);

  const handleSignOutClick = () => {
    dispatch(logoutAction())
      .then(() => dispatch(clearFavoriteOffers()))
      .then(() => dispatch(fetchOffersAction()));
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {authStatus === AuthorizationStatus.Auth
          ?
          <>
            <li className="header__nav-item user">
              <Link
                className="header__nav-link header__nav-link--profile"
                to={AppRoute.Favorites}
              >
                <div className="header__avatar-wrapper user__avatar-wrapper">
                  <img alt='avatar' src={user.avatarUrl}/>
                </div>
                <span className="header__user-name user__name">{user.email}</span>
                <span className="header__favorite-count">{offers.length}</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <Link
                className="header__nav-link"
                to="#"
                onClick={handleSignOutClick}
              >
                <span className="header__signout">Sign out</span>
              </Link>
            </li>
          </>
          :
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to={AppRoute.Login}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>}
      </ul>
    </nav>
  );
}

export default UserInfo;
