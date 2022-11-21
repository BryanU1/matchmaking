import { useEffect } from 'react';

function MatchForm(prop) {
  useEffect(() => {
    let intervalID;
    if (prop.isCounting) {
      intervalID = setInterval(() => {
        if (prop.startCount > 0) {
          prop.setStartCount(prop.startCount - 1);
        }
      }, 1000);
    }
    return () => {
      clearInterval(intervalID);
    }
  }, [prop])
  
  const handleClick = (e) => {
    if (e.target.textContent === 'Accept') {
      prop.socket.emit('check player status', true, prop.id);
    } else {
      prop.socket.emit('check player status', false, prop.id);
    }
  }

  let content;
  if (prop.isCounting) {
    content = (
      <div className='modal__content'>
        <p>Starting in...{prop.startCount}</p>
      </div>
    )
  } else {
    content =  (
      <div className='modal__content'>
        <h1>Match Found</h1>
        <button onClick={handleClick}>Accept</button>
        <button onClick={handleClick}>Decline</button>
      </div>
    )
  }

  return (
    <div className={prop.display ? 'modal' : 'modal hidden'}>
      {content}
    </div>
  );
}

export default MatchForm;