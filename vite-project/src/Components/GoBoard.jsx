// GoBoard.jsx
import { useState } from 'react';
import "./css.css";
import Intersection from "./Intersection"
import ScoreBoard from './ScoreBoard';



function GoBoard() {
  const boardSize = 9;

  const [board, setBoard] = useState(
  Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => null)
    )
    );

  const [currentPlayer, setCurrentPlayer] = useState("black");

  const handlePlay = (row, col) => {
    if (board[row][col] !== null) return;
    // Check if the game is over (for simplicity, we assume it never is in this example)
    // You can implement your own game over logic here
    // if (gameOver) return;

const newBoard = board.map((r, rowIndex) =>
  r.map((cell, colIndex) =>
    rowIndex === row && colIndex === col ? currentPlayer : cell
  )
);

setBoard(newBoard);
setCurrentPlayer(currentPlayer === "black" ? "white" : "black");
  };

  return (
    <div className="go-board-container">
      <div className="go-board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Intersection
              key={`${rowIndex}-${colIndex}`}
              rowIndex={rowIndex}
              colIndex={colIndex}
              cell={cell}
              boardSize={boardSize}
              onPlay={handlePlay}
            />
          ))
        )}
      </div>
      <p className="turn-indicator">
        Turn: <span className={currentPlayer}>{currentPlayer}</span>
      </p>
      <div>
        <ScoreBoard
          scores={{ black: 0, white: 0 }}
          currentPlayer={currentPlayer}
          gameOver={false}
        />
      </div>
    </div>
  );
}

export default GoBoard;