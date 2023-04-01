import { useState } from 'react'
import confetti from 'canvas-confetti'
import { TURNS } from './constants'
import { checkWinner, checkRowDown, checkRowUp } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { Board } from './components/Board'
import { TurnInfo } from './components/TurnInfo'
import { resetGameStorage, saveGameToStorage } from './logic/storage'

function App () {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return (boardFromStorage) ? JSON.parse(boardFromStorage) : Array(42).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return (turnFromStorage) ?? TURNS.X
  })
  // null = no winner // false = a tie
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(42).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  const updateBoard = (index) => {
    const newBoard = [...board]
    if (winner) return

    // update board
    const cell = (newBoard[index]) ? checkRowUp(index, newBoard) : checkRowDown(index, board)
    console.log({ cell })
    if (cell !== undefined) {
      newBoard[cell] = turn
      setBoard(newBoard)

      // change turn
      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
      setTurn(newTurn)

      // save game in localStorage
      saveGameToStorage({ board: newBoard, turn: newTurn })
    }

    // check for winner
    const newWinner = checkWinner(newBoard)
    setWinner(newWinner)
    if (newWinner) {
      confetti()
      resetGameStorage()
    }
  }
  return (
    <>
      <main className='board'>
        <h1>Connect 4</h1>
        <button onClick={resetGame}>Reset Game</button>
        <section className='game'>
          <Board board={board} updateBoard={updateBoard} />
        </section>
        <section className='turn'>
          <TurnInfo turn={turn} />
        </section>
        <WinnerModal winner={winner} resetGame={resetGame} />

      </main>
    </>
  )
}

export default App
