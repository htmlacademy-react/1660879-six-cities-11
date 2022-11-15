import { SortType } from '../../const';
import { useState } from 'react';

type SortProps = {
  sortOffers(action: keyof typeof SortType): void;
}

function Sort({sortOffers}: SortProps) {

  const [title, setTitle] = useState('Popular');

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by  </span>
      <span className="places__sorting-type" tabIndex={0}>
        {title}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        <li
          className="places__option places__option--active"
          tabIndex={0}
          onClick={(evt) => {
            sortOffers(SortType.Default);
            setTitle(evt.currentTarget.innerText);
          }}
        >
          Popular
        </li>
        <li
          className="places__option"
          tabIndex={0}
          onClick={(evt) => {
            sortOffers(SortType.PriceLowToHigh);
            setTitle(evt.currentTarget.innerText);
          }}
        >Price: low to high
        </li>
        <li
          className="places__option"
          tabIndex={0}
          onClick={(evt) => {
            sortOffers(SortType.PriceHighToLow);
            setTitle(evt.currentTarget.innerText);
          }}
        >Price: high to low
        </li>
        <li
          className="places__option"
          tabIndex={0}
          onClick={(evt) => {
            sortOffers(SortType.RatingHighToLow);
            setTitle(evt.currentTarget.innerText);
          }}
        >Top rated first
        </li>
      </ul>
    </form>
  );
}

export default Sort;
