import { CitiesList } from '../../const';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { changeCity } from '../../store/app-process/app-process-slice';
import { memo } from 'react';
import { getCity } from '../../store/app-process/app-process-selectors';

type TabsListProps = {
  citiesList: typeof CitiesList;
}

function TabsList({citiesList}: TabsListProps) {

  const cities = Object.keys(citiesList);
  const city = useAppSelector(getCity);

  const dispatch = useAppDispatch();

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((it: string) => (
            <li
              className="locations__item"
              key={it}
            >
              <Link
                className={it === city ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}
                to="#"
                onClick={() => dispatch(changeCity({value: it}))}
              >
                <span>{it}</span>
              </Link>
            </li>))}
        </ul>
      </section>
    </div>
  );
}

export default memo(TabsList);
