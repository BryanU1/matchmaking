function UpdateForm(prop) {
  return (
    <form onSubmit={prop.handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input 
        name="username" 
        value={prop.userInput}
        onChange={prop.userChange}
      />
      <label htmlFor="displayName">Display Name: </label>
      <input 
        name="displayName"
        value={prop.displayInput}
        onChange={prop.displayChange}
      />
      <button type='submit'>apply</button>
      <button onClick={prop.handleClick}>cancel</button>
    </form>
  )
}

export default UpdateForm;