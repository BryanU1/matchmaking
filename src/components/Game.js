import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Result from './Result';
import uniqid from 'uniqid';

function Game(prop) {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [words, setWords] = useState([]);
  const [opponentTracker, setTracker] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [result, setResult] = useState({});
  const [display, setDisplay] = useState(false);
  const [disconnect, setDisconnect] = useState(false);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(prop.mode === 'normal' ? 5 : 2);
  const keyRow1= [{button: 'Q', color: ''},{button: 'W', color: ''},{button: 'E', color: ''},{button: 'R', color: ''},{button: 'T', color: ''},{button: 'Y', color: ''},{button: 'U', color: ''},{button: 'I', color: ''},{button: 'O', color: ''},{button: 'P', color: ''}];
  const keyRow2 = [{button: 'A', color: ''},{button: 'S', color: ''},{button: 'D', color: ''},{button: 'F', color: ''},{button: 'G', color: ''},{button: 'H', color: ''},{button: 'J', color: ''},{button: 'K', color: ''},{button: 'L', color: ''}];
  const keyRow3 = [{button: 'Enter', color: ''},{button: 'Z', color: ''},{button: 'X', color: ''},{button: 'C', color: ''},{button: 'V', color: ''},{button: 'B', color: ''},{button: 'N', color: ''},{button: 'M', color: ''},{button: 'Delete', color: ''}];
  const [layout, setLayout] = useState([keyRow1,keyRow2,keyRow3]);
  
  const rowArray = [0, 1, 2, 3, 4, 5];
  const colArray = [0, 1, 2, 3, 4];

  const handleKeyDown = (e) => {
    const validInputs = 'abcdefghijklmnopqrstuvwxyz'
    if (e.key === 'Backspace' && input.length > 0) {
      // Remove a character from input
      setInput(input.slice(0, -1));
    }

    if (validInputs.includes(e.key) && input.length < 5) {
      setInput(input + e.key.toUpperCase());
    }

    // Send answer to server.
    if (e.key === 'Enter' && input.length === 5 && currentRow <= 5) {
      // Check for valid input before sending answer
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`;
      fetch(url)
        .then(res => res.json())
        .then(json => {
          if (json[0].word) {
            prop.socket.emit('check answer', prop.id, input);
          }
        })
        .catch(err => console.log(err))
    } 
  }

  // Send user to home page after a refresh.
  useEffect(() => {
    if (!prop.id) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [prop.id])

  // Display countdown.
  useEffect(() => {
    const countID = setInterval(() => {
      if (sec > 0) {
        setSec(sec - 1);
      } else if (min !== 0) {
        setSec(59);
        setMin(min - 1);
      }
    }, 1000);
    return () => {
      clearInterval(countID);
    }
  }, [sec, min])

  // Socket event listeners
  useEffect(() => {
    prop.socket.on('end match', result => {
      // Reset state
      prop.socket.emit('turn off player disconnected listener');
      setResult(result);
      clearTimeout(prop.timer);
      setWords([]);
      setTracker([]);
      setSec(0);
      setMin(0);
      setInput('');
      setCurrentRow(0);
      setDisplay(true);
      prop.setInGame(false);
      prop.setStartCount(3);
    })

    prop.socket.on('incorrect', obj => {
      if (obj.user === prop.user.username) {
        if (currentRow === 5) {
          prop.socket.emit('stalemate', prop.id);
        }
        outerLoop: for (const char of obj.arr) {
          for (let i = 0; i < layout.length; i++) {
            for (let j = 0; j < layout[i].length; j++) {
              if (char.letter === layout[i][j].button) {
                if (layout[i][j].color === 'green') {
                  continue outerLoop;
                } else if (layout[i][j].color === 'yellow') {
                  if (char.color === 'green') {
                    layout[i][j].color = char.color;
                  }
                } else {
                  layout[i][j].color = char.color;
                }
                continue outerLoop;
              }  
            }
          }
        }
        setLayout(layout);
        setWords(words.concat([obj.arr]));
        setCurrentRow(currentRow + 1);
        setInput('');
      } else {
        setTracker(opponentTracker.concat([obj.arr]));
      }
    }) 

    prop.socket.on('player disconnected', () => {
      setDisconnect(true);
    })

    return () => {
      prop.socket.off('end match');
      prop.socket.off('incorrect');
      prop.socket.off('player disconnected');
    }
    // eslint-disable-next-line
  }, [currentRow, opponentTracker])
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
    // eslint-disable-next-line
  }, [input, currentRow])

  // Create columns for inputs.
  const selectedCols = colArray.map((index) => (
    <div key={uniqid()} className='container__col selected'>
      {input.charAt(index)}
    </div>
  ));

  // Create columns without inputs.
  const cols = colArray.map((index) => (
    <div key={uniqid()} className='container__col'></div>
  ));

  // Display colors for each column.
  const coloredCols = index => {
    const cols = colArray.map(colIndex => (
      <div key={uniqid()} className={`container__col ${words[index][colIndex].color}`}>
        {words[index][colIndex].letter}
      </div>
    ))
    return cols;
  }

  // Create rows.
  const rows = rowArray.map((index) => (
    <div key={uniqid()} className='container__row'>
      {
        currentRow === index ? selectedCols : 
          index < currentRow 
            ? coloredCols(index)
            : cols
      }
    </div>
  ));

  // Display opponent's attempts and colors
  const opponentRow = rowArray.map(index => (
    <div key={uniqid()} className='container__row'>
      {
        index < opponentTracker.length
          ? colArray.map(colIndex => (
            <div key={uniqid()} className={`col--small ${opponentTracker[index][colIndex].color}`}></div>
          ))
          : colArray.map(() => (
            <div key={uniqid()} className='col--small'></div>
          ))
      }
    </div>
  ))

  // Create individual keys with colors
  const keys = arr => {
    return arr.map(obj => {
      if (obj.button === 'Enter' || obj.button === 'Delete') {
        return (
          <div key={uniqid()} className={`key__btn ${obj.color} long__btn`}>
            {obj.button}
          </div>
        )
      }
      return (
        <div key={uniqid()} className={`key__btn ${obj.color}`}>
          {obj.button}
        </div>
      )
    })
  }

  // Display the entire keyboard
  const keyboard = layout.map(arr => (
    <div key={uniqid()} className='container__row'>
      {keys(arr)}
    </div>
  ))

  return (
    <div className='div__game'>
      <div>  
        <div className='game__timer'>{min}:{sec < 10 ? '0' + sec : sec}</div>
        <div className='container__game'>
          <div className='player1__container'>
            <div className='game__player-name'>{`${prop.user.displayName} (${prop.user.rating})`}</div>
            <div>{rows}</div>
          </div>
          <div className='player2__container'>
            <div>
              {disconnect ? 'Opponent Disconnected' : ''}
            </div>
            <div>{`${prop.opponent.displayName} (${prop.opponent.rating})`}</div>
            <div>{opponentRow}</div>
          </div>
        </div>
      </div>
      {keyboard}
      <Result result={result} user={prop.user} setUser={prop.setUser} setResult={setResult} display={display} setID={prop.setID} />
    </div>
  )
}

export default Game;