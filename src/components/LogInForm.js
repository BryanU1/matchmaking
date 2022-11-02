import { useNavigate } from 'react-router-dom';

function LogInForm(prop) {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('username', e.target.username.value);
    formData.append('password', e.target.password.value);

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
        }
      })
      .catch(err => console.log(err));

  }
  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username:</label>
        <input id='username' name='username'  />
        <label htmlFor='password'>Password:</label>
        <input id='password' name='password' type='password'/>
        <button type="submit">Submit</button>
      </form>
      <p>Don't have an account? <a href="/signup">Sign up</a> with us.</p>
    </div>
  );
}

export default LogInForm;