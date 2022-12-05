import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LogInForm(prop) {
  const navigate = useNavigate();
  const [err, setErr] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      "username": e.target.username.value,
      "password": e.target.password.value
    }

    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    fetch('http://localhost:5000/log-in', options)
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          prop.setToken(json.token);
          navigate('/');
        } else {
          console.log(json.message);
          setErr(json.message);
        }
      })
      .catch(err => console.log(err));

  }
  return (
    <div className='auth__container'>
      <div className='auth__content'>  
        <h1 className='auth__h1'>Log In</h1>
        <p className='error__message'>{err}</p>
        <form className='auth__form' onSubmit={handleSubmit}>
          <label className='auth__label' htmlFor='username'>Username:</label>
          <input className='auth__input' id='username' name='username'  />
          <label className='auth__label' htmlFor='password'>Password:</label>
          <input className='auth__input' id='password' name='password' type='password'/>
          <button className='auth__btn' type="submit">LOGIN</button>
        </form>
        <p>Or sign up <a href="/signup">here</a></p>
      </div>
    </div>
  );
}

export default LogInForm;