import { useState, useEffect } from 'react';

function MatchForm(prop) { 
  const [queueTimer, setQueueTimer] = useState();
  const [counter, setCounter] = useState(5);

  // countdown display for player status check
  useEffect(() => {
    let intervalID;
    if (prop.display && counter > 0) {
      intervalID = setInterval(() => {
        setCounter(counter - 1);
      }, 1000)
    }
    if (!prop.display) {
      setCounter(5);
    }
    return () => {
      clearInterval(intervalID)
    }
  }, [counter, prop.display, queueTimer])

  // Timer for player status check
  useEffect(() => {
    if (prop.display) {
      setQueueTimer(setTimeout(() => {
        prop.socket.emit('check player status', false, prop.id);
        console.log('player inactive');
      }, 5000));
    }
    // eslint-disable-next-line
  }, [prop.display, prop.id])

  // countdown display for starting the match
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

  // clear timer when player submit
  useEffect(() => {
    prop.socket.on('player status received', () => {
      clearTimeout(queueTimer);
    })
    return () => {
      prop.socket.off('player status received');
    }
    // eslint-disable-next-line
  }, [queueTimer])

  const handleClick = (e) => {
    if (e.target.textContent === 'Accept') {
      prop.socket.emit('check player status', true, prop.id, prop.mode);
    } else {
      prop.socket.emit('check player status', false, prop.id, prop.mode);
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
        <h1>Match Found {counter}</h1>
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