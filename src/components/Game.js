import { useState, useEffect } from 'react';
import Result from './Result';

function Game(prop) {
  const [input, setInput] = useState('');
  const [words, setWords] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [result, setResult] = useState({});
  const [display, setDisplay] = useState(false);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(5);

  const rowArray = [0, 1, 2, 3, 4, 5];
  const colArray = [0, 1, 2, 3, 4];
  
  const handleKeyDown = (e) => {
    const validInputs = 'abcdefghijklmnopqrstuvwxyz'
    if (e.key === 'Backspace' && input.length > 0) {
      setInput(input.slice(0, -1));
    } 
    if (validInputs.includes(e.key) && input.length < 5) {
      setInput(input + e.key.toUpperCase());
    }
    if (e.key === 'Enter' && input.length === 5 && currentRow <= 5) {
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

  useEffect(() => {
    prop.socket.on('end match', result => {
      console.log('match result: ' + result);
      setResult(result);
      clearTimeout(prop.timer);
      setWords([]);
      setSec(0);
      setMin(0);
      setInput('');
      setCurrentRow(0);
      setDisplay(true);
      prop.setInGame(false);
      prop.setID('');
      prop.setStartCount(3);
    })

    prop.socket.on('incorrect', array => {
      if (currentRow === 5) {
        prop.socket.emit('stalemate', prop.id);
      }
      setWords(words.concat([array]));
      setCurrentRow(currentRow + 1);
      setInput('');
    }) 

    return () => {
      prop.socket.off('end match');
      prop.socket.off('incorrect');
    }
    // eslint-disable-next-line
  }, [currentRow])
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
    // eslint-disable-next-line
  }, [input, currentRow])
  
  const selectedCols = colArray.map((index) => (
    <div className='container__col selected'>
      {input.charAt(index)}
    </div>
  ));

  const cols = colArray.map((index) => (
    <div className='container__col'></div>
  ));

  const coloredCols = index => {
    const cols = colArray.map(colIndex => (
      <div className={`container__col ${words[index][colIndex].color}`}>
        {words[index][colIndex].letter}
      </div>
    ))
    return cols;
  }

  const rows = rowArray.map((index) => (
    <div className='container__row'>
      {
        currentRow === index ? selectedCols : 
          index < currentRow 
            ? coloredCols(index)
            : cols
      }
    </div>
  ));

  return (
    <div className='div__game'>
      <div className='container__game'>
        <div>{min}:{sec < 10 ? '0' + sec : sec}</div>
        <div>{rows}</div>
      </div>
      <Result result={result} user={prop.user} setResult={setResult} display={display} />
    </div>
  )
}

export default Game;