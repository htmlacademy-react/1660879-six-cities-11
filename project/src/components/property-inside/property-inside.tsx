import { Offer } from '../../types/offer';

type PropertyInsideProps = {
  offer: Offer;
}

function PropertyInside({offer}: PropertyInsideProps) {
  return (
    <div className="property__inside">
      <h2 className="property__inside-title">What&lsquo;s inside</h2>
      <ul className="property__inside-list">
        {offer.goods.map((it) => (
          <li className="property__inside-item" key={it}>{it}</li>)
        )}
      </ul>
    </div>
  );
}

export default PropertyInside;
