import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import uniqid from 'uniqid';

function SignUpForm() {
  const navigate = useNavigate();
  const url = 'http://localhost:5000/sign-up';
  const [error, setError] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault()

    setError([]);
    setErrors([]);

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

    fetch(url, options)
      .then(response => response.json())
      .then(json => {
        if (json.errors) {
          setErrors(json.errors);
          console.log(json.errors);
          return;
        }
        if (json.error) {
          setError(json.error);
          return;
        }
        if (json.status === 200) {
          navigate('/');
        } 
      })
      .catch(err => console.log(err));
  }

  const errorsMsg = errors.map(err => (
    <li key={uniqid()} className='error__message'>{err.msg}</li>
  ))

  const errMsg = error.map(err => (
    <li key={uniqid()} className='error__message'>{err.msg}</li>
  ))

  return (
    <div className='auth__container'>
      <div className='auth__content'>
        <h1 className='auth__h1'>Sign Up</h1>
        <form className='auth__form' onSubmit={handleSubmit}>
          <label className='auth__label' htmlFor='username'>Username:</label>
          <input className='auth__input' id='username' name='username'/>
          <label className='auth__label' htmlFor='password'>Password:</label>
          <input className='auth__input' id='password' name='password' type='password'/>
          <ul className='err__container'>
            {errorsMsg}
            {errMsg}
          </ul>
          <button className='auth__btn' type="submit">Sign Up</button>
        </form>
        <p>Or log in <a href="/">here</a></p>
      </div>
    </div>
  );
}

export default SignUpForm;