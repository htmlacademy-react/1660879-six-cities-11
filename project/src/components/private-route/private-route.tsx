import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  authStatus: string;
  children: JSX.Element;
}

function PrivateRoute({authStatus, children}: PrivateRouteProps): JSX.Element {
  return authStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;
