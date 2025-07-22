import { useState, useEffect } from "react";
import "./css.css";
import Intersection from "./Intersection";
import { getGojiMove } from "./ComputerLogic";
import { applyMove } from "./captureLogic";

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
    </div>
  );
}

export default GoBoard;
