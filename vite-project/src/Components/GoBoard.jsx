import { useState, useEffect } from "react";
import "./css.css";

import Intersection from "./Intersection"
import ScoreBoard from './ScoreBoard';


import Intersection from "./Intersection";
import { getGojiMove } from "./ComputerLogic";
import { applyMove } from "./captureLogic"

function GoBoard() {
  const boardSize = 9;
  const [board, setBoard] = useState(
    Array.from({ length: boardSize }, () =>
      Array.from({ length: boardSize }, () => null)
    )
  );
  const [currentPlayer, setCurrentPlayer] = useState("black");
  const [vsGoji, setVsGoji] = useState(false); // toggle mode

  const handlePlay = (row, col) => {
    if (board[row][col] !== null) return;
    // Check if the game is over (for simplicity, we assume it never is in this example)
    // You can implement your own game over logic here
    // if (gameOver) return;

    let newBoard = applyMove(row, col, currentPlayer, board, boardSize);
    setBoard(newBoard);

    const nextPlayer = currentPlayer === "black" ? "white" : "black";
    setCurrentPlayer(nextPlayer);

    if (vsGoji && nextPlayer === "white") {
      setTimeout(() => {
        const [botRow, botCol] = getGojiMove(newBoard, "white", boardSize) || [];

        if (botRow !== undefined && newBoard[botRow][botCol] === null) {
          const boardAfterBot = applyMove(botRow, botCol, "white", newBoard, boardSize);
          setBoard(boardAfterBot);
          setCurrentPlayer("black");
        }
      }, 500);
    }
  };

  return (
    <div className="go-board-container">
      <div className="go-board-switch">
        <button
          onClick={() => setVsGoji((prev) => !prev)}
          className={`toggle-mode-button ${vsGoji ? "goji-mode" : "two-player-mode"}`}>
          {vsGoji ? "Playing vs Goji" : "2 Player Mode"}
        </button>
      </div>

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
        Turn:{" "}
        <span className={currentPlayer}>
          {vsGoji && currentPlayer === "white" ? "Goji" : currentPlayer}
        </span>
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
