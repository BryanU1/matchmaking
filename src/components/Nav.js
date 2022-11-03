import { Link } from 'react-router-dom';

function Nav(prop) {
  let user;
  const handleLogOut = () => {
    prop.setToken('');
  }
  if (!prop.token) {
    user = (
      <Link to='/login' className='nav__link'>
        <div className='btn__log-in'>Log In</div>
      </Link>
    )
  } else {
    user = (
      <div 
        onClick={handleLogOut} 
        className='btn__log-out'
      >
          Log Out
      </div>
    )
  }
  return (
    <nav className='nav nav--theme-black'>
      <div className='nav__items'>
        <Link to='/' className='nav__link' >
          <h1 className='h1__home'>Home</h1>
        </Link>
        <ul className='menu'>
          <Link to='/play' className='nav__link' >
            <li className='menu__item'>Play</li>
          </Link>
          <li className='menu__item'>Leaderboard</li>
          <li className='menu__item'>Profile</li>
        </ul>
      </div>
      {user}
    </nav>
  );
}

export default Nav;