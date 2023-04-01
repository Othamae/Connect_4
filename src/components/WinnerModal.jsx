import { Square } from './Square'

export function WinnerModal ({ winner, resetGame }) {
  if (winner === null) return null

  const winnerText = winner === false ? 'TIE' : 'THE WINNER!!'
  return (
    <section className='winner'>
      <div className='text'>
        <h1>{winnerText}
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
