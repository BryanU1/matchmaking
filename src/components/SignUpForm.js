function SignUpForm() {
  const url = 'http://localhost:5000/sign-up';
  return (
    <div>
      <h1>Sign Up</h1>
      <form action={url} method='POST'>
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