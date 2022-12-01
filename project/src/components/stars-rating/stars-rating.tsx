type StarsRatingProps = {
  rating: number;
}

function StarsRating({rating}: StarsRatingProps) {
  return (
    <>
      <span style={{ width: `${Math.round(rating) / 5 * 100}%` }} />
      <span className="visually-hidden">Rating</span>
    </>
  );
}

export default StarsRating;
