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
    queueUI = <button onClick={handleLeave}>Leave Queue</button>
  } else if (prop.token) {
    queueUI = (
      <div>
        <p>Normal:</p>
        <button onClick={handleNormQueue}>Join Queue</button>
        <p>Ranked:</p>
        <button onClick={handleRankedQueue}>Join Queue</button>
      </div>
    )
  } else {
    queueUI = <div>Not logged in</div>
  }

  return (
    <div>
      {queueUI}
    </div>
  )
}

export default Play;