import React, { useState } from "react";
import "./css.css";

import Intersection from "./Intersection";
import ScoreBoard from "./ScoreBoard";
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
  const [scores, setScores] = useState({ black: 0, white: 0 });
  const [passCount, setPassCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [vsGoji, setVsGoji] = useState(false);

  const handlePlay = (row, col) => {
    if (gameOver || board[row][col]) return;

    const newBoard = applyMove(row, col, currentPlayer, board, boardSize);
    setBoard(newBoard);

    
    setScores(prev => ({
      ...prev,
      [currentPlayer]: prev[currentPlayer] + 1
    }));

    setCurrentPlayer(prev => (prev === "black" ? "white" : "black"));
    setPassCount(0);

    
    if (vsGoji && currentPlayer === "black") {
      setTimeout(() => {
        const [botRow, botCol] = getGojiMove(newBoard, "white", boardSize) || [];
        if (botRow !== undefined) {
          const botBoard = applyMove(botRow, botCol, "white", newBoard, boardSize);
          setBoard(botBoard);
          setScores(prev => ({
            ...prev,
            white: prev.white + 1
          }));
          setCurrentPlayer("black");
        }
      }, 500);
    }
  };

  const handlePass = () => {
    if (gameOver) return;
    const newPassCount = passCount + 1;
    setPassCount(newPassCount);

    if (newPassCount >= 2) {
      setGameOver(true);
    } else {
      setCurrentPlayer(currentPlayer === "black" ? "white" : "black");
    }
  };

  const resetGame = () => {
    setBoard(Array.from({ length: boardSize }, () =>
      Array.from({ length: boardSize }, () => null)
    ));
    setCurrentPlayer("black");
    setScores({ black: 0, white: 0 });
    setGameOver(false);
    setPassCount(0);
  };

  return (
    <div className="game-container">
      <div className="go-board-switch">
        <button
          onClick={() => setVsGoji(prev => !prev)}
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

      <ScoreBoard
        scores={scores}
        currentPlayer={currentPlayer}
        gameOver={gameOver}
        onRestart={resetGame}
        onPass={handlePass}
      />
    </div>
  );
}

export default GoBoard;


