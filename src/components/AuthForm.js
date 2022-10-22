function AuthForm(prop) {
  return (
    <div>
      <h1>{prop.title}</h1>
      <form>
        <label for='username'>Username:</label>
        <input id='username' name='username'  />
        <label for='password'>Password:</label>
        <input id='password' name='password' />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AuthForm;