function Result(prop) {
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
        <p>Answer: {prop.result.word}</p>
        <p>Current Rating:</p>
        <button onClick={handleClick}>Leave</button>
      </div>
    </div>
  )
}

export default Result;