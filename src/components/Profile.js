import { useState } from 'react';
import UpdateForm from './UpdateForm';
import ReadForm from './ReadForm';

function Profile(prop) {
  const [readOnly, setReadOnly] = useState(true);
  const [userInput, setUserInput] = useState(prop.user.username);
  const [displayInput, setDispInput] = useState(prop.user.displayName);

  const userChange = (e) => {
    setUserInput(e.target.value);
  }
  const displayChange = (e) => {
    setDispInput(e.target.value);
  }

  const handleClick = (e) => {
    e.preventDefault()

    setReadOnly(!readOnly);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/user/${prop.user.id}/update`;
    const data = {
      "username": e.target.username.value,
      "displayName": e.target.displayName.value
    }
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${prop.token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data),
    }

    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        if (json.errors) {
          console.log(json.errors);
          return;
        }
        if (json.error) {
          console.log(json.error);
          return;
        }
        setReadOnly(true);
      })
      .then(() => {
        const options = {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${prop.token}`,
            'Content-type': 'application/json'
          }
        } 
        fetch(`http://localhost:5000/api/profile`, options)
          .then(res => res.json())
          .then(json => {
            prop.setUser(json.user);
          })
          .catch(err => console.log(err));
      })
  }
  if (!prop.token) {
    return (
      <div>
        Currently not logged in
      </div>
    );
  }
  return (
    <div>
      {readOnly 
        ? <ReadForm 
            handleClick={handleClick}
            user={prop.user}
          /> 
        : <UpdateForm 
            handleClick={handleClick} 
            handleSubmit={handleSubmit}
            userInput={userInput}
            userChange={userChange}
            displayInput={displayInput}
            displayChange={displayChange}
          />}
      <div>
        <h2>Ranked:</h2>
        <p>rating: {prop.user.rating}</p>
        <p>wins: {prop.user.wins}</p>
        <p>losses: {prop.user.losses}</p>
        <p>draws: {prop.user.draws}</p>
        <p>games: {prop.user.games}</p>
      </div>
    </div>
  );
}

export default Profile;