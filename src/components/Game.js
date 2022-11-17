import { useState, useEffect } from 'react';

function Game(prop) {
  const [input, setInput] = useState('');
  const [words, setWords] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const rowArray = [0, 1, 2, 3, 4, 5];
  const colArray = [0, 1, 2, 3, 4];
  const chosen = 'WORLD';
  
  const handleKeyDown = (e) => {
    const validInputs = 'abcdefghijklmnopqrstuvwxyz'
    if (e.key === 'Backspace' && input.length > 0) {
      setInput(input.slice(0, -1));
    } 
    if (validInputs.includes(e.key) && input.length < 5) {
      setInput(input + e.key.toUpperCase());
    }
    if (e.key === 'Enter' && input.length === 5) {
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`
      fetch(url)
        .then(res => res.json())
        .then(json => {
          if (json[0].word) {
            const arr = words.concat([input]);
            setWords(arr);
            setCurrentRow(currentRow + 1);
            setInput('');
          }
        })
    } 
  }
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
    // eslint-disable-next-line
  }, [input])
  
  const selectedCols = colArray.map((index) => (
    <div className='container__col selected'>
      {input.charAt(index)}
    </div>
  ));

  const cols = colArray.map((index) => (
    <div className='container__col'></div>
  ));

  const coloredCols = index => {
    const cols = colArray.map(colIndex => {
      if (chosen.charAt(colIndex) === words[index].charAt(colIndex)){
        return (
          <div className='container__col green'>
            {words[index].charAt(colIndex)}
          </div>
        )
      }
      for (let i = 0; i < 5; i++) {
        if (chosen.charAt(i) === words[index].charAt(colIndex)) {
          return (
            <div className='container__col yellow'>
              {words[index].charAt(colIndex)}
            </div>
          )
        }
      }
      return (
        <div className='container__col gray'>
          {words[index].charAt(colIndex)}
        </div>
      )
    })
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
    <div className={prop.inGame ? 'div__game' : 'div__game hidden'}>
      <div className='container__game'>
        {rows}
      </div>
    </div>
  )
}

export default Game;