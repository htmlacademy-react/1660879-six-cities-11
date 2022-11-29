import { SortType } from '../../const';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCity } from '../../store/app-process/app-process-selectors';

type SortProps = {
  sortOffers(action: keyof typeof SortType): void;
}

function Sort({sortOffers}: SortProps) {

  const [title, setTitle] = useState('Popular');
  const [dropdownShouldBeShown, setDropdownShouldBeShown] = useState<boolean>(false);

  const city = useAppSelector(getCity);

  useEffect(() => {
    setTitle('Popular');
    setDropdownShouldBeShown(false);
  }, [city]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by  </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setDropdownShouldBeShown(true)}
      >
        {title}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {dropdownShouldBeShown &&
        <ul className="places__options places__options--custom places__options--opened">
          <li
            className="places__option places__option--active"
            tabIndex={0}
            onClick={(evt) => {
              sortOffers(SortType.Default);
              setTitle(evt.currentTarget.innerText);
              setDropdownShouldBeShown(false);
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
              setDropdownShouldBeShown(false);
            }}
          >Price: low to high
          </li>
          <li
            className="places__option"
            tabIndex={0}
            onClick={(evt) => {
              sortOffers(SortType.PriceHighToLow);
              setTitle(evt.currentTarget.innerText);
              setDropdownShouldBeShown(false);
            }}
          >Price: high to low
          </li>
          <li
            className="places__option"
            tabIndex={0}
            onClick={(evt) => {
              sortOffers(SortType.RatingHighToLow);
              setTitle(evt.currentTarget.innerText);
              setDropdownShouldBeShown(false);
            }}
          >Top rated first
          </li>
        </ul>}
    </form>
  );
}

export default Sort;
