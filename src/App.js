import { useState } from 'react';
import './App.css';

function App() {

  const [cells, setcells] = useState(Array(9).fill(''))
  const [turn, setturn] = useState('x')
  const [winners, setwinner] = useState('');


  const restart = () => {
    setwinner('');
    setcells(Array(9).fill(''))
  }

  const winner = (square) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
      ],
      diagonl: [
        [0, 4, 8],
        [2, 4, 6]
      ],
    };

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          square[pattern[0]] === '' ||
          square[pattern[1]] === '' ||
          square[pattern[2]] === ''
        ) {
          
        } else if (
          square[pattern[0]] === square[pattern[1]] &&
          square[pattern[1]] === square[pattern[2]]
        ) {
          setwinner(square[pattern[0]]);
        }
      });
    }
  }
  const click = (num) => {
    if (winners === '') {
      if (cells[num] !== '') {
        alert('already clicked')
        return
      }
      let square = [...cells]

      if (turn === 'x') {
        square[num] = 'x';
        setturn('o');
      } else {
        square[num] = 'o';
        setturn('x');
      }
      winner(square)
      setcells(square)
  
    }
    else {
      alert('match ended plz restart')
      restart()
    }

  }


  const Cell = ({num}) => {
    return <td onClick={() => click(num)}>{cells[num]}</td>
  };


  return (
    <div className="App">
      <div className='container'>
        <h1>Tic Tac Toe</h1><h3>player: { turn }</h3>
        <table>
          <tbody>
            <tr> 
              <Cell num={0}/>
              <Cell num={1}/>
              <Cell num={2}/>
            </tr>
            <tr>
              <Cell num={3}/>
              <Cell num={4}/>
              <Cell num={5}/>
            </tr>
            <tr>
              <Cell num={6}/>
              <Cell num={7}/>
              <Cell num={8}/>
            </tr>
          </tbody>
        </table>
        {winners && (
          <>
            <p>{winners} is the winner</p>
            <button onClick={()=> restart()}>play again</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
