import { Comment } from '../../types/comment';
import Review from '../review/review';

type ReviewsListProps = {
  comments: Comment[];
}

function ReviewsList({comments}: ReviewsListProps) {
  return (
    <ul className="reviews__list">
      {!!comments.length &&
      comments
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
        .slice(0, 10)
        .map((it) => <Review comment={it} key={it.id}/>)}
    </ul>
  );
}

export default ReviewsList;
