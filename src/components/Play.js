function Play(prop) {
  const handleClick = () => {
    prop.socket.emit("join queue", prop.token);
  }
  return (
    <div>
      {prop.token
        ? <button onClick={handleClick}>Join Queue</button>
        : <div>Not logged in</div>
      }
    </div>
  )
}

export default Play;