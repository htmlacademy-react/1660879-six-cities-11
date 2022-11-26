import { Comment } from '../../types/comment';
import Review from '../review/review';

type ReviewsListProps = {
  comments: Comment[];
}

function ReviewsList({comments}: ReviewsListProps) {
  return (
    <ul className="reviews__list">
      {!!comments.length && comments.map((it) => <Review comment={it} key={it.id}/>)}
    </ul>
  );
}

export default ReviewsList;
