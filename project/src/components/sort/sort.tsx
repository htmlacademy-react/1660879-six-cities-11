import { SortType } from '../../const';

type SortProps = {
  sortOffers(action: keyof typeof SortType): void;
}

function Sort({sortOffers}: SortProps) {

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        <li className="places__option places__option--active" tabIndex={0} onClick={() => sortOffers(SortType.Default)}>Popular</li>
        <li className="places__option" tabIndex={0} onClick={() => sortOffers(SortType.PriceLowToHigh)}>Price: low to high</li>
        <li className="places__option" tabIndex={0} onClick={() => sortOffers(SortType.PriceHighToLow)}>Price: high to low</li>
        <li className="places__option" tabIndex={0} onClick={() => sortOffers(SortType.RatingHighToLow)}>Top rated first</li>
      </ul>
    </form>
  );
}

export default Sort;
