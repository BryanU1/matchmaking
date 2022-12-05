import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Play(prop) {
  const navigate = useNavigate();
  let queueUI;

  const handleNormQueue = () => {
    prop.setMode('normal');
    prop.setInQueue(true);
    prop.socket.emit('join queue', prop.token, 'normal');
  }

  const handleRankedQueue = () => {
    prop.setMode('ranked')
    prop.setInQueue(true);
    prop.socket.emit('join queue', prop.token, 'ranked');
  }

  const handleLeave = () => {
    if (prop.mode === 'normal') {
      prop.socket.emit('leave queue', prop.mode);
      prop.socket.emit('turn off pairing listener', prop.mode);
    }
    if (prop.mode === 'ranked') {
      prop.socket.emit('leave queue', prop.mode);
      prop.socket.emit('turn off pairing listener', prop.mode);
    }
    prop.setInQueue(false);
    prop.setMode('');
  }

  useEffect(() => {
    if (prop.inGame) {
      navigate(`/match/${prop.id}`)
    }
    // eslint-disable-next-line
  }, [prop.inGame, prop.id])

  if (prop.inQueue) {
    queueUI = (
      <div>
        <h1>In Queue...</h1>
        <button className="btn__queue" onClick={handleLeave}>
          Leave Queue
        </button>
      </div>
    )
  } else if (prop.token) {
    queueUI = (
      <div className="queue__container">
        <div className="queue__content">
          <h1 className="queue__heading">Casual</h1>
          <p className="queue__p">Time: 5 minutes</p>
          <p className="queue__p">Win: +0 rating</p>
          <p className="queue__p">Lose: -0 rating</p>
          <p className="queue__p">Draw: +0 rating</p>
          <button className="btn__queue" onClick={handleNormQueue}>PLAY</button>
        </div>
        <div className="queue__content">
          <h1 className="queue__heading">Ranked</h1>
          <p className="queue__p">Time: 2 minutes</p>
          <p className="queue__p">Win: +15 rating</p>
          <p className="queue__p">Lose: -15 rating</p>
          <p className="queue__p">Draw: +0 rating</p>
          <button className="btn__queue" onClick={handleRankedQueue}>PLAY</button>
        </div>
      </div>
    )
  } else {
    queueUI = <div>Not logged in</div>
  }

  return (
    <div className="div__queue">
      {queueUI}
    </div>
  )
}

export default Play;