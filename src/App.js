import React, { useState } from 'react';
import './App.css';

function App() {
  function calculateWinner(square) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (square[a] && square[a] === square[b] && square[a] === square[c]) {
            return square[a];
        }
    }
    return null;
  }
  
    const Game = () => {
      const [board, setBoard] = useState(Array(9).fill(null))
      const [xIsNext, setXIsNext] = useState(true)
      const winner = calculateWinner(board)

      const handleClick = (index) => {
          const boardCopy = [...board]
          // Opredelit bil li klick po yacheike ili igra zakonchena
          if (winner || boardCopy[index])  return null
          // Opredelit chei hod X > 0
          boardCopy[index] = xIsNext ? 'X' : 'O'
          // Obnovit state
          setBoard(boardCopy)
          setXIsNext(!xIsNext)
      }

      const startNewGame = () => {
          return (
              <button className='start_btn' onClick={() => setBoard(Array(9).fill(null))}>Очистить поле</button>
          )
      }
      return (
          <div className="wrapper">
              { startNewGame() }
              <Board squares={board} click={handleClick} />
              <p className='game_info'>
                  { winner ? 'Победитель ' + winner : 'Сейчас ходит ' + ( xIsNext ? 'X' : 'O' ) }
              </p>
          </div>
      );

      
    }

    const Board = ({squares, click}) => {
      return (
          <div className="board">
              {
                  squares.map((square, i) => (
                      <Square key={i} value={square} onClick={() => click(i)} />
                  ))
              }
          </div>
      );
    }

    const Square = (props) => {
      return (
          <button className='square' onClick={props.onClick}>{props.value} </button>
      );
    }

  return (
    <Game />

    

  );
}

export default App;
