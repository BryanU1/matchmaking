import { useState, useEffect } from 'react';

function MatchForm(prop) { 
  const [queueTimer, setQueueTimer] = useState();
  const [counter, setCounter] = useState(5);
  const [hasPicked, setHasPicked] = useState(false);

  // Display countdown for player ready status.
  useEffect(() => {
    let intervalID;
    if (prop.display && counter > 0) {
      intervalID = setInterval(() => {
        setCounter(counter - 1);
      }, 1000)
    }
    if (!prop.display) {
      // Match form is hidden. Reset state.
      setCounter(5);
      setHasPicked(false);
    }
    return () => {
      clearInterval(intervalID)
    }
  }, [counter, prop.display, queueTimer])

  // Set time limit for player status check.
  useEffect(() => {
    if (prop.display) {
      setQueueTimer(setTimeout(() => {
        // Player did not respond. Emit event to server.
        prop.socket.emit(
          'check player status', 
          false, 
          prop.id
        );
      }, 5000));
    }
    // eslint-disable-next-line
  }, [prop.display, prop.id])

  // Display countdown before starting the match.
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

  // Clear timer when player submit.
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
      prop.socket.emit(
        'check player status', 
        true, 
        prop.id, 
        prop.mode
      );
    } else {
      prop.socket.emit(
        'check player status',
        false, 
        prop.id, 
        prop.mode
      );
    }
    setHasPicked(true);
  }

  let content;
  // Display countdown before a match.
  if (prop.isCounting) {
    content = (
      <div className='modal__content'>
        <h1 className='modal__h1'>
          Starting in...{prop.startCount}
        </h1>
      </div>
    )

  // Player declined. Notify players of match status.
  } else if (prop.isCancelled) {
    content = (
      <div className='modal__content'>
        <h1 className='modal__h1'>Match Declined</h1>
      </div>
    )

  // Player has picked. Notify players to wait for other player.
  } else if (hasPicked) {
    content = (
      <div className='modal__content'>
        <h1 className='modal__h1'>
          Waiting For Other Player...
        </h1>
      </div>
    )
  // Display form to players.
  } else {
    content =  (
      <div className='modal__content'>
        <h1 className='modal__h1'>Match Found</h1>
        <p className='modal__p'>Closing in {counter}</p>
        <button 
          className='modal__btn' 
          onClick={handleClick}
        >
          Accept
        </button>
        <button 
          className='modal__btn btn-red' 
          onClick={handleClick}
        >
          Decline
        </button>
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