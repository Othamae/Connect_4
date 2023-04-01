import { useState } from 'react'

const TURNS = {
  X: '🟡',
  O: '🔴'

}

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App () {
  const [board, setBoard] = useState(Array(42).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  // null = no winner // false = a tie
  const [winner, setWinner] = useState(null)

  const checkRowDown = (index, board) => {
    if (index > 35) {
      console.log('cell entra xq es mayor que 35')
      if (!board[index]) return index
      else return
    }
    const cell = index + 7
    if (board[cell] === null) return (checkRowDown(cell, board))
    return index
  }

  const checkRowUp = (index, board) => {
    if (index < 7) return
    const cell = index - 7
    if (board[cell] === null) return cell
    return (checkRowUp(cell, board))
  }

  function checkWinner (board) {
    // Check for horizontal wins
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        const cell = row * 7 + col
        console.log(`chequeo horizontal ${cell}`)
        const sequence = [board[cell], board[cell + 1], board[cell + 2], board[cell + 3]]
        if (sequence.every((val) => val === TURNS.X) || sequence.every((val) => val === TURNS.O)) {
          return sequence[0]
        }
      }
    }

    // Check for vertical wins
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 3; row++) {
        const cell = row * 7 + col
        console.log(`chequeo vertical ${cell}`)
        const sequence = [board[cell], board[cell + 7], board[cell + 14], board[cell + 21]]
        if (sequence.every((val) => val === TURNS.X) || sequence.every((val) => val === TURNS.O)) {
          return sequence[0]
        }
      }
    }

    // Check for diagonal wins (top-left to bottom-right)
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        const cell = row * 7 + col
        console.log(`chequeo diagonal(top-left to bottom-right) ${cell}`)
        const sequence = [board[cell], board[cell + 8], board[cell + 16], board[cell + 24]]
        if (sequence.every((val) => val === TURNS.X) || sequence.every((val) => val === TURNS.O)) {
          return sequence[0]
        }
      }
    }

    // Check for diagonal wins (top-right to bottom-left)
    for (let row = 0; row < 3; row++) {
      for (let col = 3; col < 7; col++) {
        const cell = row * 7 + col
        console.log(`chequeo diagonal(top-right to bottom-left) ${cell}`)
        const sequence = [board[cell], board[cell + 6], board[cell + 12], board[cell + 18]]
        if (sequence.every((val) => val === TURNS.X) || sequence.every((val) => val === TURNS.O)) {
          return sequence[0]
        }
      }
    }

    // Check for ties
    if (board.every((val) => val !== null)) {
      return false
    }

    // No winner
    return null
  }

  const resetGame = () => {
    setBoard(Array(42).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    const newBoard = [...board]
    if (winner) return

    // update board
    const cell = (newBoard[index]) ? checkRowUp(index, newBoard) : checkRowDown(index, board)
    newBoard[cell] = turn
    setBoard(newBoard)

    // check for winner
    const newWinner = checkWinner(newBoard)
    setWinner(newWinner)

    // change turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
  }
  return (
    <>
      <main className='board'>
        <h1>Connect 4</h1>
        <button onClick={resetGame}>Reset Game</button>
        <section className='game'>
          {
            board.map((_, index) => {
              return (
                <Square
                  key={index}
                  index={index}
                  updateBoard={updateBoard}
                >
                  {board[index]}
                </Square>
              )
            })
          }
        </section>
        <section className='turn'>
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
          </Square>
          <Square isSelected={turn === TURNS.O}>
            {TURNS.O}
          </Square>
        </section>

        {
            winner !== null && (
              <section className='winner'>
                <div className='text'>
                  <h1>{
                    winner === false
                      ? 'TIE'
                      : 'THE WINNER!!'
                    }
                  </h1>
                  <header className='win'>
                    {winner && <Square>{winner}</Square>}
                  </header>
                  <footer>
                    <button onClick={resetGame}>Start again</button>
                  </footer>
                </div>
              </section>
            )
          }

      </main>
    </>
  )
}

export default App
