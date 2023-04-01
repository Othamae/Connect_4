
import { Square } from './Square'

export function Board ({ updateBoard, board }) {
  return (
    board.map((square, index) => {
      return (
        <Square
          key={index}
          index={index}
          updateBoard={updateBoard}
        >
          {square}
        </Square>
      )
    })
  )
}
