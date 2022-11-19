function MatchForm(prop) {
  const handleClick = (e) => {
    if (e.target.textContent === 'Accept') {
      prop.socket.emit('check player status', true, prop.id);
    } else {
      prop.socket.emit('check player status', false, prop.id);
    }
  }
  return (
    <div className={prop.display ? 'modal' : 'modal hidden'}>
      <div className='modal__content'>
        <h1>Match Found</h1>
        <button onClick={handleClick}>Accept</button>
        <button onClick={handleClick}>Decline</button>
      </div>
    </div>
  );
}

export default MatchForm;