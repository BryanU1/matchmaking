function Play(prop) {
  const handleClick = () => {
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${prop.token}`,
        'Content-type': 'application/json'
      }
    }
 
    fetch('http://localhost:5000/queue', options)
      .then(res => res.json())
      .then(json => console.log(json))
  }
  return (
    <button onClick={handleClick}>Join Queue</button>
  )
}

export default Play;