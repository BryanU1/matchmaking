import { Link } from 'react-router-dom';

function Nav(prop) {
  let user;
  const handleLogOut = () => {
    prop.setToken('');
  }
  if (!prop.token) {
    user = (
      <button className='btn__log-in'>
        <Link to='/login'>Log In</Link>
      </button>
    )
  } else {
    user = (
      <button onClick={handleLogOut}>Log Out</button>
    )
  }
  return (
    <nav className='nav nav--theme-black'>
      <Link to='/' >
        <h1 className='h1__home'>Home</h1>
      </Link>
      <ul className='menu'>
        <li className='menu__item'>Play</li>
        <li className='menu__item'>Leaderboard</li>
        <li className='menu__item'>Profile</li>
      </ul>
      {user}
    </nav>
  );
}

export default Nav;