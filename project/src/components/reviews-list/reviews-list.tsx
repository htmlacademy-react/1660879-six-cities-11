import dayjs from 'dayjs';
import { Comment } from '../../types/comment';
import StarsRating from './../../components/stars-rating/stars-rating';

type ReviewsListProps = {
  comments: Comment[];
}

function ReviewsList({comments}: ReviewsListProps) {
  return (
    <ul className="reviews__list">
      {comments.length && comments.map((it) => (
        <li className="reviews__item" key={it.id}>
          <div className="reviews__user user">
            <div className="reviews__avatar-wrapper user__avatar-wrapper">
              <img
                className="reviews__avatar user__avatar"
                src={it.user.avatarUrl}
                width={54}
                height={54}
                alt={it.user.name}
              />
            </div>
            <span className="reviews__user-name">{it.user.name}</span>
          </div>
          <div className="reviews__info">
            <div className="reviews__rating rating">
              <div className="reviews__stars rating__stars">
                <StarsRating rating={it.rating} />
              </div>
            </div>
            <p className="reviews__text">
              {it.comment}
            </p>
            <time className="reviews__time" dateTime={it.date}>
              {dayjs(it.date).format('MMMM YYYY')}
            </time>
          </div>
        </li>))}
    </ul>
  );
}

export default ReviewsList;
