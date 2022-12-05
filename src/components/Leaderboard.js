import { useEffect, useState } from 'react';

function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const url = 'http://localhost:5000/api/leaderboard';
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setPlayers(json);
      })
  }, [])

  const leaderboard = players.map((player, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{player.displayName}</td>
      <td>{player.rating}</td>
    </tr>
  ))

  return (
    <div className='leaderboard__container'>
      <h1 className='leaderboard__heading'>Top 100</h1>
      <table className='leaderboard__table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard}
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard;