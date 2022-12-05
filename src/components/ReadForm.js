function ReadForm(prop) {
  return (
    <form className="form__profile">
      <label className="profile__label" htmlFor="username">Username:</label>
      <input 
        name="username" 
        value={prop.user.username}
        className="profile__input"
        disabled
      />
      <label className="profile__label" htmlFor="displayName">Display Name: </label>
      <input 
        name="displayName"
        value={prop.user.displayName}
        className="profile__input"
        disabled
      />
      <button className="form__btn" onClick={prop.handleClick}>EDIT</button>
    </form>
  )
}

export default ReadForm;