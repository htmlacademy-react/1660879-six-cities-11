import { AuthorizationStatus } from '../../const';
import { Comment } from '../../types/comment';
import ReviewsForm from '../reviews-form/reviews-form';
import ReviewsList from '../reviews-list/reviews-list';

type PropertyReviewsBlockProps = {
  comments: Comment[];
  authStatus: string;
  handleCommentsChange: (newComments: Comment[]) => void;
}

function PropertyReviewsBlock({comments, authStatus, handleCommentsChange}: PropertyReviewsBlockProps) {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
    Reviews · <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ReviewsList comments={comments}/>
      {authStatus === AuthorizationStatus.Auth ? <ReviewsForm handleCommentsChange={handleCommentsChange} /> : ''}
    </section>
  );
}

export default PropertyReviewsBlock;
