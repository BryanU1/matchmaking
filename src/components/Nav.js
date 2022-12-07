import { Link, useNavigate } from 'react-router-dom';

function Nav(prop) {
  const navigate = useNavigate();
  const handleLogOut = () => {
    // Player logged out. Send user to home page.
    prop.setToken('');
    navigate('/');
  }
  return (
    <nav className='nav'>
      <div className='nav__items'>
        <ul className='menu'>
          <Link to='/' className='nav__link menu__home'>
            <li className='menu__item'>Play</li>
          </Link>
          <Link to='/profile' className='nav__link'>
            <li className='menu__item'>Profile</li>
          </Link>
          <Link to='/leaderboard' className='nav__link'>
            <li className='menu__item'>Leaderboard</li>
          </Link>
        </ul>
      </div>
      <div onClick={handleLogOut} className='btn__log-out'>
        Log Out
      </div>
    </nav>
  );
}

export default Nav;