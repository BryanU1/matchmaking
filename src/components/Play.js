function Play(prop) {
  const handleClick = () => {
    prop.socket.emit("join queue", {
      token: prop.token
    });
    
  }
  return (
    <button onClick={handleClick}>Join Queue</button>
  )
}

export default Play;