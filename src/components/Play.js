function Play(prop) {
  let queueUI;
  const handleClick = () => {
    prop.setInQueue(true);
    prop.socket.emit("join queue", prop.token);
  }

  if (prop.token && prop.inQueue) {
    queueUI = <p>Currently in queue...</p>
  } else if (prop.token) {
    queueUI = <button onClick={handleClick}>Join Queue</button>
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