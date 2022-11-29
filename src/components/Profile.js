function Profile(prop) {
  if (!prop.token) {
    return (
      <div>
        Currently not logged in
      </div>
    );
  }
  return (
    <div>
      <form>
        <label htmlFor="username">Username:</label>
        <input 
          name="username" 
          value={prop.user.username}
          disabled
        />
        <label htmlFor="displayName">Display Name: </label>
        <input 
          name="displayName"
          value={prop.user.displayName}
          disabled
        />
      </form>
      <p>rating: {prop.user.rating}</p>
    </div>
  );
}

export default Profile;