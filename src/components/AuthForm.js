function AuthForm(prop) {
  const url = prop.type === 'Sign Up' ?
    'http://localhost:5000/sign-up' :
    'http://localhost:5000/log-in';
  return (
    <div>
      <h1>{prop.type}</h1>
      <form action={url} method='POST'>
        <label for='username'>Username:</label>
        <input id='username' name='username'  />
        <label for='password'>Password:</label>
        <input id='password' name='password' type='password'/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AuthForm;