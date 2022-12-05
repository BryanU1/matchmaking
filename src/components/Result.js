import { useState, useEffect } from 'react';

function Result(prop) {
  const [rating, setRating] = useState(prop.user.rating);
  const [ratingDiff, setRatingDiff] = useState(0);
  
  useEffect(() => {
    if (Array.isArray(prop.result.ratings)) {
      for (const player of prop.result.ratings) {
        if (player.username === prop.user.username) {
          let wins = prop.user.wins;
          let losses = prop.user.losses;
          let draws = prop.user.draws;
          setRating(player.rating);
          setRatingDiff(player.rating - prop.user.rating);
          if (player.rating - prop.user.rating > 0) {
            wins++;
          }
          if (player.rating - prop.user.rating < 0) {
            losses++;
          }
          if (player.rating === prop.user.rating) {
            draws++;
          }
          const newUser = {
            id: prop.user.id,
            username: prop.user.username,
            displayName: prop.user.displayName,
            rating: player.rating,
            wins,
            losses,
            draws,
            games: prop.user.games + 1,
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
        <h1 className='modal__h1'>{heading}</h1>
        <p className='modal__p'>{prop.result.message ? prop.result.message : ''}</p>
        <p className='modal__p'>Answer: {prop.result.word}</p>
        <p className='modal__p'>Current Rating: {ratingDiff > 0 ? `${rating}(+${ratingDiff})` : `${rating}(${ratingDiff})`}</p>
        <button className='modal__btn btn-black' onClick={handleClick}>Leave</button>
      </div>
    </div>
  )
}

export default Result;