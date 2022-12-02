import { useState, useEffect } from 'react';

function Result(prop) {
  const [rating, setRating] = useState(prop.user.rating);
  const [ratingDiff, setRatingDiff] = useState(0);
  
  useEffect(() => {
    if (Array.isArray(prop.result.ratings)) {
      for (const player of prop.result.ratings) {
        if (player.username === prop.user.username) {
          setRating(player.rating);
          setRatingDiff(player.rating - prop.user.rating);
          const newUser = {
            id: prop.user.id,
            username: prop.user.username,
            displayName: prop.user.displayName,
            rating: player.rating
          }
          prop.setUser(newUser);
        }
      }
    }
    // eslint-disable-next-line
  }, [prop.result])
  
  let heading;
  if (prop.result.winner === prop.user.username) {
    heading = 'You Win';
  } else if (prop.result.winner === 'none') {
    heading = 'Draw';
  } else {
    heading = 'You Lost'
  }
  const handleClick = () => {
    prop.setID('');
  }
  
  return (
    <div className={prop.display ? 'modal' : 'modal hidden'}>
      <div className="modal__content">
        <h1>{heading}</h1>
        <p>{prop.result.message ? prop.result.message : ''}</p>
        <p>Answer: {prop.result.word}</p>
        <p>Current Rating: {ratingDiff > 0 ? `${rating}(+${ratingDiff})` : `${rating}(${ratingDiff})`}</p>
        <button onClick={handleClick}>Leave</button>
      </div>
    </div>
  )
}

export default Result;