function AuthForm(prop) {
  const url = prop.type === 'Sign Up' ?
    'http://competitive-wordle-api.herokuapp.com/sign-up' :
    'http://competitive-wordle-api.herokuapp.com/log-in';
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