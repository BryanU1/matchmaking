import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <Link to='/signup'>
        <button>Sign up</button>
      </Link>
    </div>
  );
}

export default Home;