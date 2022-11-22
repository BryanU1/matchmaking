import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Play(prop) {
  const navigate = useNavigate();
  let queueUI;
  const handleQueue = () => {
    prop.setInQueue(true);
    prop.socket.emit('join queue', prop.token);
  }
  const handleLeave = () => {
    prop.setInQueue(false);
    prop.socket.emit('leave queue');
    prop.socket.emit('turn off listener');
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
    queueUI = <button onClick={handleQueue}>Join Queue</button>
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