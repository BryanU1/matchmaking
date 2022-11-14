function MatchForm(prop) {
  const handleClick = (e) => {
    console.dir(e.target.textContent);
  }
  return (
    <div className={prop.display ? 'modal' : 'modal'}>
      <div className='form__match'>
        <h1>Match Found</h1>
        <button onClick={handleClick}>Accept</button>
        <button>Decline</button>
      </div>
    </div>
  );
}

export default MatchForm;