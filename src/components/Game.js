import { useState, useEffect } from 'react';

function Game(prop) {
  const [input, setInput] = useState('');
  const [currentRow, setCurrentRow] = useState(0);
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
  }
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
    // eslint-disable-next-line
  }, [input])
  
  const selectedCols = colArray.map((index) => (
    <div className='container__col selected'>{input.charAt(index)}</div>
  ));

  const cols = colArray.map((index) => (
    <div className='container__col'></div>
  ));

  const rows = rowArray.map((index) => (
    <div className='container__row'>
      {currentRow === index ? selectedCols : cols}
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