import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NoProperty() {
  const style = {
    marginLeft: '40px'
  };

  return (
    <>
      <Helmet>
        <title>6 cities. There is no such property</title>
      </Helmet>
      <h1 style={style}>There is no such property</h1>
      <Link className='locations__item-link' style={style} to={AppRoute.Root}>Back to the main page</Link>
    </>
  );
}

export default NoProperty;
