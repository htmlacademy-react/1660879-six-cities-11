import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../const';

function NotFound() {
  const style = {
    marginLeft: '40px'
  };

  return (
    <>
      <Helmet>
        <title>404 Page Not Found</title>
      </Helmet>
      <h1 style={style}>404 Not Found</h1>
      <Link className='locations__item-link' style={style} to={AppRoute.Root}>Back to the main page</Link>
    </>
  );
}

export default NotFound;
