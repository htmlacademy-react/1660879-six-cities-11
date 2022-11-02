import { Offer } from '../../types/offer';

type PropertyGalleryProps = {
  offer: Offer;
}

function PropertyGallery({offer}: PropertyGalleryProps) {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {offer.images.slice(0,6).map((it) => (
          <div className="property__image-wrapper" key={it}>
            <img
              className="property__image"
              src={it}
              alt={offer.title}
            />
          </div>))}
        {/* <div className="property__image-wrapper">
          <img
            className="property__image"
            src="img/room.jpg"
            alt="Photo studio"
          />
        </div>
        <div className="property__image-wrapper">
          <img
            className="property__image"
            src="img/apartment-01.jpg"
            alt="Photo studio"
          />
        </div>
        <div className="property__image-wrapper">
          <img
            className="property__image"
            src="img/apartment-02.jpg"
            alt="Photo studio"
          />
        </div>
        <div className="property__image-wrapper">
          <img
            className="property__image"
            src="img/apartment-03.jpg"
            alt="Photo studio"
          />
        </div>
        <div className="property__image-wrapper">
          <img
            className="property__image"
            src="img/studio-01.jpg"
            alt="Photo studio"
          />
        </div>
        <div className="property__image-wrapper">
          <img
            className="property__image"
            src="img/apartment-01.jpg"
            alt="Photo studio"
          />
        </div> */}
      </div>
    </div>
  );
}

export default PropertyGallery;
