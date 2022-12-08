import { useState } from 'react';
import UpdateForm from './UpdateForm';
import ReadForm from './ReadForm';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import uniqid from 'uniqid';

ChartJS.register(ArcElement, Tooltip, Legend);

function Profile(prop) {
  const [readOnly, setReadOnly] = useState(true);
  const [userInput, setUserInput] = useState(prop.user.username);
  const [displayInput, setDispInput] = useState(prop.user.displayName);
  const [error, setError] = useState([]);
  const [errors, setErrors] = useState([]);
  const winRate = Math.round(prop.user.wins / prop.user.games * 1000) / 10; 

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

    setError([]);
    setErrors([]);

    const url = `https://competitive-wordle-api.herokuapp.com/user/${prop.user.id}/update`;
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
          setErrors(json.errors);
          return;
        }
        if (json.error) {
          setError(json.error);
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
        fetch(`https://competitive-wordle-api.herokuapp.com/api/profile`, options)
          .then(res => res.json())
          .then(json => {
            prop.setUser(json.user);
          })
          .catch(err => console.log(err));
      })
  }

  const data = {
    labels: ['Wins', 'Losses', 'Draws'],
    datasets: [
      {
        data: [prop.user.wins,prop.user.losses,prop.user.draws],
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
          'rgb(88, 88, 88)'
        ],
        hoverOffset: 4
      }
    ]
  }

  const errorsMsg = errors.map(err => (
    <li key={uniqid()} className='error__message'>{err.msg}</li>
  ))

  const errMsg = error.map(err => (
    <li key={uniqid()} className='error__message'>{err}</li>
  ))

  if (!prop.token) {
    return (
      <div>
        Currently not logged in
      </div>
    );
  }
  return (
    <div className='profile__container'>
      <div className='profile__ranked'>
        <h2 className='profile__h2'>Ranked:</h2>
        <p>Rating: {prop.user.rating}</p>
        <p>Wins: {prop.user.wins}</p>
        <p>Losses: {prop.user.losses}</p>
        <p>Draws: {prop.user.draws}</p>
        <p>Win Rate: {prop.user.games === 0 ? 0 : winRate}%</p>
      </div>
      <div className='chart'>
        <Doughnut data={data} />
      </div>
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
            errorsMsg={errorsMsg}
            errMsg={errMsg}
          />
      }
    </div>
  );
}

export default Profile;