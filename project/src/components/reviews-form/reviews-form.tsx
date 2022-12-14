import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { APIRoute } from '../../const';
import { createAPI } from '../../services/api';
import { Comment } from '../../types/comment';
import { Oval } from 'react-loader-spinner';

const initialFormState = {
  rating: 0,
  review: '',
};

type ReviewsFormProps = {
  handleCommentsChange: (newComments: Comment[]) => void;
}

function ReviewsForm({handleCommentsChange}: ReviewsFormProps) {
  const api = createAPI();
  const { id } = useParams();
  const [formData, setFormData] = useState(initialFormState);
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);

  const {pathname} = useLocation();

  useEffect(() => {
    setFormData(initialFormState);
  }, [pathname]);


  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmmit = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setIsFormDisabled(true);
    api.post<Comment[]>(`${APIRoute.Comments}/${id as string}`, {
      comment: formData.review,
      rating: formData.rating,
    }).then((response) => handleCommentsChange(response.data))
      .then(() => setFormData(initialFormState))
      .finally(() => setIsFormDisabled(false));
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          checked={Number(formData.rating) === 5}
          onChange={handleFieldChange}
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={5}
          id="5-stars"
          type="radio"
          disabled={isFormDisabled}
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          checked={Number(formData.rating) === 4}
          onChange={handleFieldChange}
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={4}
          id="4-stars"
          type="radio"
          disabled={isFormDisabled}
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          checked={Number(formData.rating) === 3}
          onChange={handleFieldChange}
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={3}
          id="3-stars"
          type="radio"
          disabled={isFormDisabled}
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          checked={Number(formData.rating) === 2}
          onChange={handleFieldChange}
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={2}
          id="2-stars"
          type="radio"
          disabled={isFormDisabled}
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          checked={Number(formData.rating) === 1}
          onChange={handleFieldChange}
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={1}
          id="1-star"
          type="radio"
          disabled={isFormDisabled}
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>
      <textarea
        onChange={handleFieldChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        disabled={isFormDisabled}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        {isFormDisabled
          ?
          <Oval
            height={30}
            width={30}
            color="#4481c3"
            wrapperStyle={{position: 'absolute', right: '25%'}}
            wrapperClass=""
            ariaLabel='oval-loading'
            secondaryColor="#4481c3"
            strokeWidth={5}
            strokeWidthSecondary={5}
          />
          :
          <button
            className="reviews__submit form__submit button"
            type="submit"
            onClick={handleFormSubmmit}
            disabled={formData.review.length < 50 || formData.review.length > 300 || formData.rating === 0 || isFormDisabled}
          >
          Submit
          </button>}
      </div>
    </form>
  );
}

export default ReviewsForm;
