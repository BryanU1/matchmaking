import { Link } from 'react-router-dom';

function Result(prop) {
  const handleClick = () => {
    prop.result({});
  }

  let heading;
  if (prop.result.winner === prop.user.username) {
    heading = 'You Win';
  } else if (prop.result.winner === 'none') {
    heading = 'Draw';
  } else {
    heading = 'You Lost'
  }
  return (
    <div className={prop.display ? 'modal' : 'modal hidden'}>
      <div className="modal__content">
        <h1>{heading}</h1>
        <p>Answer: {prop.result.word}</p>
        <p>Current Rating:</p>
        <Link to='/play'>
          <button onClick={handleClick}>Leave</button>
        </Link>
      </div>
    </div>
  )
}

export default Result;