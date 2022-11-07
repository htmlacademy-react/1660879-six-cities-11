import dayjs from 'dayjs';
import { Comment } from '../../types/comment';
import StarsRating from './../../components/stars-rating/stars-rating';

type ReviewProps = {
  comment: Comment;
}

function Review({comment}: ReviewProps) {
  return (
    <li className="reviews__item" key={comment.id}>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={comment.user.avatarUrl}
            width={54}
            height={54}
            alt={comment.user.name}
          />
        </div>
        <span className="reviews__user-name">{comment.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <StarsRating rating={comment.rating} />
          </div>
        </div>
        <p className="reviews__text">
          {comment.comment}
        </p>
        <time className="reviews__time" dateTime={comment.date}>
          {dayjs(comment.date).format('MMMM YYYY')}
        </time>
      </div>
    </li>
  );
}

export default Review;
