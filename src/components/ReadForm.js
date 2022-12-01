function ReadForm(prop) {
  return (
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
      <button onClick={prop.handleClick}>edit</button>
    </form>
  )
}

export default ReadForm;