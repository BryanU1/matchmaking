import { Link } from 'react-router-dom';

function Nav() {
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
      <button className='btn__log-in'>Log In</button>
    </nav>
  );
}

export default Nav;