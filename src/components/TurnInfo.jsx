import { Square } from './Square'
import { TURNS } from '../constants'

export function TurnInfo ({ turn }) {
  return (
    <>
      <Square isSelected={turn === TURNS.X}>
        {TURNS.X}
      </Square>
      <Square isSelected={turn === TURNS.O}>
        {TURNS.O}
      </Square>
    </>
  )
}
