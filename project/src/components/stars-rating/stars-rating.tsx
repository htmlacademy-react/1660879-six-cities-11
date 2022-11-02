type StarsRatingProps = {
  rating: number;
}

function StarsRating({rating}: StarsRatingProps) {
  return (
    <>
      <span style={{ width: `${rating / 5 * 100}%` }} />
      <span className="visually-hidden">Rating</span>
    </>
  );
}

export default StarsRating;
