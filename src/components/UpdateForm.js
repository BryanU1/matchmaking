function UpdateForm(prop) {
  return (
    <form className="form__profile" onSubmit={prop.handleSubmit}>
      <label 
        className="profile__label" 
        htmlFor="username"
      >
        Username:
      </label>
      <input 
        name="username" 
        value={prop.userInput}
        onChange={prop.userChange}
        className="profile__input"
      />
      <label 
        className="profile__label" 
        htmlFor="displayName"
      >
          Display Name: 
      </label>
      <input 
        name="displayName"
        value={prop.displayInput}
        onChange={prop.displayChange}
        className="profile__input"
      />
      <ul className="err__container">
        {prop.errMsg}
        {prop.errorsMsg}
      </ul>
      <button className="form__btn" type='submit'>APPLY</button>
      <button 
        className="form__btn" 
        onClick={prop.handleClick}
      >
        CANCEL
      </button>
    </form>
  )
}

export default UpdateForm;