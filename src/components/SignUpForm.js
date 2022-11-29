import { useNavigate } from 'react-router-dom';

function SignUpForm() {
  const navigate = useNavigate();
  const url = 'http://localhost:5000/sign-up';
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

    fetch(url, options)
      .then(response => response.json())
      .then(json => {
        if (json.errors) {
          console.log(json.errors);
        }
        if (json.errors.length === 0) {
          navigate('/');
        } 
      })
      .catch(err => console.log(err));

  }
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username:</label>
        <input id='username' name='username'  />
        <label htmlFor='password'>Password:</label>
        <input id='password' name='password' type='password'/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignUpForm;